package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"recipeApp/httpd/handler"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"
	"strings"
	"testing"
	"time"

	jwt "github.com/golang-jwt/jwt/v5"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func SetUpRouter() *gin.Engine {
	router := gin.Default()
	return router
}
func TestRecipesRoute(t *testing.T) {

	r := SetUpRouter()

	r.GET("/server/recipes", handler.RecipeGet())

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/server/recipes", nil)

	r.ServeHTTP(w, req)

	var recipes []models.Recipe
	json.Unmarshal(w.Body.Bytes(), &recipes)
	var numRecipes int64
	initialize.Db.Table("recipe").Count(&numRecipes)

	assert.Equal(t, http.StatusOK, w.Code, "Did not retrieve all recipes.")
	assert.NotEmpty(t, recipes, "Empty result for all recipes.")
	assert.Equal(t, len(recipes), int(numRecipes), "Not enough recipes returned.")

}

func TestRecipeGetByID(t *testing.T) {

	r := SetUpRouter()

	r.GET("/server/recipes", handler.RecipeGet())

	w := httptest.NewRecorder()

	req, _ := http.NewRequest("GET", "/server/recipes?id=7", nil)

	r.ServeHTTP(w, req)

	var recipe models.Recipe
	json.Unmarshal(w.Body.Bytes(), &recipe)

	assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipe by ID.")
	assert.Equal(t, recipe.Rid, uint(7), "Retrieved the wrong recipe.")

}

func TestRecipeGetByKeyword(t *testing.T) {

	r := SetUpRouter()

	r.GET("/server/recipes", handler.RecipeGet())

	w := httptest.NewRecorder()

	testWord := "pumpkin"

	req, _ := http.NewRequest("GET", "/server/recipes?keyword=pumpkin", nil)

	r.ServeHTTP(w, req)
	var recipes []models.Recipe
	json.Unmarshal(w.Body.Bytes(), &recipes)

	hasKeyword := true

	for _, recipe := range recipes {
		hasKeyword = (strings.Contains(strings.ToLower(recipe.Title), testWord) ||
			strings.Contains(strings.ToLower(recipe.Ingredients), testWord) ||
			strings.Contains(strings.ToLower(recipe.Instructions), testWord))

		if !hasKeyword {
			break
		}

	}

	assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipes with keyword 'pumpkin'.")
	assert.NotEmpty(t, recipes)
	assert.Equal(t, hasKeyword, true, "One or more recipes did not contain keyword 'pumpkin'.")

}

func TestRecipeGetByIngredient(t *testing.T) {

	r := SetUpRouter()

	r.GET("/server/recipes", handler.RecipeGet())

	w := httptest.NewRecorder()

	testWord := "cornichon"

	req, _ := http.NewRequest("GET", "/server/recipes?ingredient=cornichon", nil)

	r.ServeHTTP(w, req)
	var recipes []models.Recipe
	json.Unmarshal(w.Body.Bytes(), &recipes)

	hasKeyword := true

	for _, recipe := range recipes {
		hasKeyword =
			strings.Contains(strings.ToLower(recipe.Ingredients), testWord)

		if !hasKeyword {
			break
		}

	}

	assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipes with ingredient 'cornichon'.")
	assert.NotEmpty(t, recipes)
	assert.Equal(t, hasKeyword, true, "One or more recipes did not contain ingredient 'cornichon'.")

}

func TestRecipeGetByPage(t *testing.T) {

	r := SetUpRouter()

	r.GET("/server/recipes/bypage", handler.RecipeGetByPage())

	type test struct {
		input string
		page  int
		size  int
	}
	//var recipes []models.Recipe
	url := "/server/recipes/bypage"
	var recipes []models.Recipe

	testConds := []test{
		{input: url + "?page=1&per_page=5", page: 1, size: 5},
		{input: url + "?page=2&per_page=5", page: 2, size: 5},
		{input: url + "?page=10&per_page=5", page: 10, size: 5},
		{input: url + "?page=100&per_page=5", page: 100, size: 5},
		{input: url + "?page=1&per_page=10", page: 1, size: 10},
		{input: url + "?page=2&per_page=10", page: 2, size: 10},
		{input: url + "?page=10&per_page=10", page: 10, size: 10},
		{input: url + "?page=100&per_page=10", page: 100, size: 10},
		{input: url + "?page=1&per_page=25", page: 1, size: 25},
		{input: url + "?page=2&per_page=25", page: 2, size: 25},
		{input: url + "?page=10&per_page=25", page: 10, size: 25},
		{input: url + "?page=100&per_page=25", page: 100, size: 25},
		{input: url + "?page=1&per_page=100", page: 1, size: 100},
		{input: url + "?page=2&per_page=100", page: 2, size: 100},
		{input: url + "?page=10&per_page=100", page: 10, size: 100},
		{input: url + "?page=100&per_page=100", page: 100, size: 100},
	}

	for _, tc := range testConds {
		req, _ := http.NewRequest("GET", tc.input, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		json.Unmarshal(w.Body.Bytes(), &recipes)
		lastrID := int(recipes[len(recipes)-1].Rid)

		assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipes with test conditions "+tc.input)
		assert.Equal(t, tc.size, len(recipes), "Did not retrieve the correct number of recipes, expected 10.")
		assert.Equal(t, tc.page*tc.size-1, int(lastrID), "Last retrieved element was different, expected "+strconv.Itoa(lastrID))

	}

}

func TestRecipePost(t *testing.T) {

	r := SetUpRouter()

	r.POST("/server/recipes/add", handler.CreateRecipe())
	type test struct {
		Rid          uint   `json:"rid"`
		Title        string `json:"title"`
		Instructions string `json:"instructions"`
		Ingredients  string `json:"ingredients"`
		Image_name   string `json:"image_name"`
		Uid          uint   `json:"uid"`
	}

	var testRecipes []test
	var numRecipes int64
	initialize.Db.Table("recipe").Count(&numRecipes)

	testRecipes = append(testRecipes,
		test{Rid: uint(numRecipes + 1), Title: "Test Recipe 1", Ingredients: "paprika,pepper,serrano",
			Instructions: "stir gently", Image_name: "test_image_1", Uid: 2},
		test{Rid: uint(numRecipes + 2), Title: "Test Recipe 2", Ingredients: "pasta",
			Instructions: "heat in microwave", Image_name: "test_image_2", Uid: 2},
		test{Rid: uint(numRecipes + 3), Title: "Test Recipe 3", Ingredients: "deviled eggs, legumes",
			Instructions: "party time", Image_name: "test_image_3", Uid: 2},
	)

	for tc := range testRecipes {
		jsonValue, _ := json.Marshal(testRecipes[tc])
		req, _ := http.NewRequest("POST", "/server/recipes/add", bytes.NewBuffer(jsonValue))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code, "Unable to post recipe "+testRecipes[tc].Title)

	}

}

func TestRecipeDelete(t *testing.T) {
	r := SetUpRouter()
	r.DELETE("/server/recipes/delete/:id", handler.DeleteRecipe())

	var numRecipes int64
	initialize.Db.Table("recipe").Count(&numRecipes)

	rids := []string{strconv.FormatInt(numRecipes-2, 10),
		strconv.FormatInt(numRecipes-1, 10),
		strconv.FormatInt(numRecipes, 10)}

	for _, val := range rids {
		req, _ := http.NewRequest("DELETE", "/server/recipes/delete/"+val, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code, "Could not delete recipe "+val)

	}

	bogus := "55000"
	req, _ := http.NewRequest("DELETE", "/server/recipes/delete/"+bogus, nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code, "Could not delete recipe "+bogus)
}

func TestLogin(t *testing.T) {

	r := SetUpRouter()

	r.POST("/server/login", handler.Login)
	type test struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var testUsers []test

	testUsers = append(testUsers,
		test{Email: "seth@gmail.com", Password: "food"},
		test{Email: "ThisIsNotValidAccount", Password: "ThisIsNotValidAccount"},
	)

	jsonValue, _ := json.Marshal(testUsers[0])
	req, _ := http.NewRequest("POST", "/server/login", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code, "Login failed")

	jsonValue, _ = json.Marshal(testUsers[1])
	req, _ = http.NewRequest("POST", "/server/login", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code, "Login failed")
}

func TestRegister(t *testing.T) {

	r := SetUpRouter()

	r.POST("/server/register", handler.Register)
	type test struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var testUsers []test

	testUsers = append(testUsers,
		test{Email: "seth@gmail.com", Password: "food"},
		test{Email: "newaccount@yahoo.com", Password: "password"},
	)

	initialize.Db.Table("users").Where("email = ?", "newaccount@yahoo.com").Delete(testUsers[1])

	jsonValue, _ := json.Marshal(testUsers[0])
	req, _ := http.NewRequest("POST", "/server/register", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code, "Register failed or user already exists")

	jsonValue, _ = json.Marshal(testUsers[1])
	req, _ = http.NewRequest("POST", "/server/register", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code, "Register failed or user already exists")
}

func TestAccountAuth(t *testing.T) {
	r := SetUpRouter()

	r.GET("/server/account", handler.Account)
	type JWTData struct {
		// Standard claims are the standard jwt claims from the IETF standard
		// https://tools.ietf.org/html/rfc7519
		jwt.RegisteredClaims
		CustomClaims map[string]string `json:"custom,omitempty"`
	}

	// Failing auth (invalid secret key)
	testClaim := JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
		},
	}

	testToken := jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err := testToken.SignedString([]byte("0"))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err := json.Marshal(struct {
		Token string `json:"token"`
	}{
		testTokenString,
	})

	req, _ := http.NewRequest("GET", "/server/account", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code, "Authentication fail test (key): unsuccessful")

	// Failing auth (time expired)
	testClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Date(1980, 1, 1, 12, 0, 0, 0, time.UTC)),
		},
	}

	testToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err = testToken.SignedString([]byte(handler.SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err = json.Marshal(struct {
		Token string `json:"token"`
	}{
		testTokenString,
	})

	req, _ = http.NewRequest("GET", "/server/account", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code, "Authentication fail test (expiry): unsuccessful")

	// Successful auth
	testClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
		},
	}

	testToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err = testToken.SignedString([]byte(handler.SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err = json.Marshal(struct {
		Token string `json:"token"`
	}{
		testTokenString,
	})

	req, _ = http.NewRequest("GET", "/server/account", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code, "Authentication success test: unsuccessful")
}

func TestRefresh(t *testing.T) {
	r := SetUpRouter()

	r.POST("/server/account/refresh", handler.RefreshToken)
	type JWTData struct {
		// Standard claims are the standard jwt claims from the IETF standard
		// https://tools.ietf.org/html/rfc7519
		jwt.RegisteredClaims
		CustomClaims map[string]string `json:"custom,omitempty"`
	}

	// Failing auth (invalid secret key)
	testClaim := JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
		},
	}

	testRefClaim := JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 2)),
		},
	}

	testToken := jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err := testToken.SignedString([]byte(handler.SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	testRefToken := jwt.NewWithClaims(jwt.SigningMethodHS256, testRefClaim)
	testRefString, err := testRefToken.SignedString([]byte("0"))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err := json.Marshal(struct {
		Token        string `json:"token"`
		RefreshToken string `json:"refreshToken"`
	}{
		testTokenString, testRefString,
	})

	req, _ := http.NewRequest("POST", "/server/account/refresh", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	req.Header.Set("Refresh", "Bearer "+testRefString)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code, "Authentication fail test (key): unsuccessful")

	// Failing auth (expired time)
	testClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
		},
	}

	testRefClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Date(1980, 1, 1, 12, 0, 0, 0, time.UTC)),
		},
	}

	testToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err = testToken.SignedString([]byte(handler.SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	testRefToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testRefClaim)
	testRefString, err = testRefToken.SignedString([]byte(handler.REFRESH_SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err = json.Marshal(struct {
		Token        string `json:"token"`
		RefreshToken string `json:"refreshToken"`
	}{
		testTokenString, testRefString,
	})

	req, _ = http.NewRequest("POST", "/server/account/refresh", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	req.Header.Set("Refresh", "Bearer "+testRefString)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusUnauthorized, w.Code, "Authentication fail test (expiry): unsuccessful")

	// Success auth
	testClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute)),
		},
		CustomClaims: map[string]string{
			"userid": "1",
		},
	}

	testRefClaim = JWTData{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 2)),
		},
		CustomClaims: map[string]string{
			"userid": "1",
		},
	}

	testToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testClaim)
	testTokenString, err = testToken.SignedString([]byte(handler.SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	testRefToken = jwt.NewWithClaims(jwt.SigningMethodHS256, testRefClaim)
	testRefString, err = testRefToken.SignedString([]byte(handler.REFRESH_SECRET))
	if err != nil {
		log.Println(err)
		return
	}

	jsonValue, err = json.Marshal(struct {
		Token        string `json:"token"`
		RefreshToken string `json:"refreshToken"`
	}{
		testTokenString, testRefString,
	})

	req, _ = http.NewRequest("POST", "/server/account/refresh", bytes.NewBuffer(jsonValue))
	req.Header.Set("Authorization", "Bearer "+testTokenString)
	req.Header.Set("Refresh", "Bearer "+testRefString)
	w = httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusOK, w.Code, "Authentication success test: unsuccessful")
}
