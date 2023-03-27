package main

import (
	"bytes"
	"encoding/json"
	"fmt"
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

func TestRecipeGetByKeyword(t *testing.T) {
	/*Testing the get_by_page endpoint on recipe retrieval by keyword./
	  This test will check that each recipe returned includes results that have the keyword
	  in either the title, ingredients, or instructions field.
	  It also checks for an HTTP OK response.
	  For a keyword that is nonsensical, it returns an empty result*/

	r := SetUpRouter()
	url := "/server/recipes/bypage"
	type test struct {
		input    string
		testWord string
	}
	var recipes []models.Recipe

	r.GET(url, handler.RecipeGetByPage())

	testConds := []test{
		{input: url + "?page=1&per_page=10&keyword=pumpkin&uid=0", testWord: "pumpkin"},
		{input: url + "?page=1&per_page=10&keyword=pepperoncini&uid=0", testWord: "pepperoncini"},
		{input: url + "?page=1&per_page=10&keyword=yellow&uid=0", testWord: "yellow"},
		{input: url + "?page=1&per_page=10&keyword=simmer&uid=0", testWord: "simmer"},
		{input: url + "?page=1&per_page=10&keyword=5%20oz&uid=0", testWord: "5 oz"},
		{input: url + "?page=1&per_page=10&keyword=400%20degrees&uid=0", testWord: "400 degrees"},
		{input: url + "?page=1&per_page=10&keyword=crock%20pot&uid=0", testWord: "crock pot"},
		{input: url + "?page=1&per_page=10&keyword=wedonthaveit&uid=0", testWord: "wedonthaveit"},
		{input: url + "?page=1&per_page=10000&keyword=chicken&uid=0", testWord: "chicken"},
		{input: url + "?page=1&per_page=10000&keyword=beef&uid=0", testWord: "beef"},
	}

	for _, tc := range testConds {
		req, _ := http.NewRequest("GET", tc.input, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		json.Unmarshal(w.Body.Bytes(), &recipes)

		hasKeyword := true

		for _, recipe := range recipes {
			hasKeyword = (strings.Contains(strings.ToLower(recipe.Title), tc.testWord) ||
				strings.Contains(strings.ToLower(recipe.Ingredients), tc.testWord) ||
				strings.Contains(strings.ToLower(recipe.Instructions), tc.testWord))

			if !hasKeyword {
				break
			}

		}

		assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipes with keyword "+tc.testWord+".")
		if tc.testWord == "wedonthaveit" {
			assert.Empty(t, recipes)
		} else {
			assert.NotEmpty(t, recipes)
		}
		assert.Equal(t, hasKeyword, true, "One or more recipes did not contain keyword "+tc.testWord+".")

	}

}

func TestRecipeGetByKeywordCount(t *testing.T) {
	/*Testing the get_by_page endpoint on recipe retrieval by keyword./
	  This test will check that the correct number of recipes are returned for each keyword.
	  It also checks for an HTTP OK response.*/

	r := SetUpRouter()
	url := "/server/recipes/recipecount"
	type test struct {
		input    string
		testWord string
		size     int64
	}
	type count struct {
		Total int64
	}

	var storeit count

	r.GET(url, handler.RecipeGetCount())

	testConds := []test{
		{input: url + "?keyword=pumpkin&uid=0", testWord: "pumpkin", size: 259},
		{input: url + "?keyword=pepperoncini&uid=0", testWord: "pepperoncini", size: 7},
		{input: url + "?keyword=yellow&uid=0", testWord: "yellow", size: 773},
		{input: url + "?keyword=simmer&uid=0", testWord: "simmer", size: 3620},
		{input: url + "?keyword=5%20oz&uid=0", testWord: "5 oz", size: 101},
		{input: url + "?keyword=400%20degrees&uid=0", testWord: "400 degrees", size: 14},
		{input: url + "?keyword=crock%20pot&uid=0", testWord: "crock pot", size: 5},
		{input: url + "?keyword=notreal&uid=0", testWord: "notreal", size: 0},
	}

	for _, tc := range testConds {
		req, _ := http.NewRequest("GET", tc.input, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		err := json.Unmarshal(w.Body.Bytes(), &storeit)
		if err != nil {
			fmt.Println("error:", err)
		}

		assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve count with test conditions "+tc.input)
		assert.Equal(t, tc.size, storeit.Total,
			"Did not retrieve the correct number of recipes, expected "+strconv.Itoa(int(int8(tc.size)))+".")

	}

}

func TestRecipeGetByIngredient(t *testing.T) {
	/*Testing the get_by_page endpoint on recipe retrieval by ingredient/
	  This test will check that each recipe returned includes an ingredient with the search term.
	  It also checks for an HTTP OK response.*/

	r := SetUpRouter()
	url := "/server/recipes/bypage"
	type test struct {
		input    string
		testWord string
	}
	var recipes []models.Recipe

	r.GET(url, handler.RecipeGetByPage())

	testConds := []test{
		{input: url + "?page=1&per_page=10&ingredient=pumpkin&uid=0", testWord: "pumpkin"},
		{input: url + "?page=1&per_page=10&ingredient=pepperoncini&uid=0", testWord: "pepperoncini"},
		{input: url + "?page=1&per_page=10&ingredient=yellow&uid=0", testWord: "yellow"},
		{input: url + "?page=1&per_page=10&ingredient=simmer&uid=0", testWord: "simmer"},
		{input: url + "?page=1&per_page=10&ingredient=wedonthaveit&uid=0", testWord: "wedonthaveit"},
		{input: url + "?page=1&per_page=10000&ingredient=pumpkin&uid=0", testWord: "pumpkin"},
		{input: url + "?page=1&per_page=10000&ingredient=pepperoncini&uid=0", testWord: "pepperoncini"},
		{input: url + "?page=1&per_page=10000&ingredient=yellow&uid=0", testWord: "yellow"},
		{input: url + "?page=1&per_page=10000&ingredient=simmer&uid=0", testWord: "simmer"},
	}

	for _, tc := range testConds {
		req, _ := http.NewRequest("GET", tc.input, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		json.Unmarshal(w.Body.Bytes(), &recipes)

		hasIngredient := true

		for _, recipe := range recipes {
			hasIngredient =
				strings.Contains(strings.ToLower(recipe.Ingredients), tc.testWord)

			if !hasIngredient {
				break
			}

		}

		assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve recipes with ingredient "+tc.testWord+".")
		if tc.testWord == "wedonthaveit" {
			assert.Empty(t, recipes)
		} else {
			assert.NotEmpty(t, recipes)
		}

		assert.Equal(t, hasIngredient, true, "One or more recipes did not contain ingredient"+tc.testWord+".")

	}

}

func TestRecipeGetByIngredientCount(t *testing.T) {
	/*Testing the get_by_page endpoint on recipe retrieval by keyword./
	  This test will check that the correct number of recipes are returned for each keyword.
	  It will also check that each recipe returned includes results that have the keyword
	  in either the with the search term.
	  It also checks for an HTTP OK response.*/

	r := SetUpRouter()
	url := "/server/recipes/recipecount"
	type test struct {
		input    string
		testWord string
		size     int64
	}
	type count struct {
		Total int64
	}

	var storeit count

	r.GET(url, handler.RecipeGetCount())

	testConds := []test{
		{input: url + "?ingredient=pumpkin&uid=0", testWord: "pumpkin", size: 245},
		{input: url + "?ingredient=pepperoncini&uid=0", testWord: "pepperoncini", size: 6},
		{input: url + "?ingredient=yellow&uid=0", testWord: "yellow", size: 649},
		{input: url + "?ingredient=simmer&uid=0", testWord: "simmer", size: 2},
		{input: url + "?ingredient=5%20oz&uid=0", testWord: "5 oz", size: 92},
		{input: url + "?ingredient=notreal&uid=0", testWord: "notreal", size: 0},
	}

	for _, tc := range testConds {
		req, _ := http.NewRequest("GET", tc.input, nil)
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		err := json.Unmarshal(w.Body.Bytes(), &storeit)
		if err != nil {
			fmt.Println("error:", err)
		}

		assert.Equal(t, http.StatusOK, w.Code, "Unable to retrieve count with test conditions "+tc.input)
		assert.Equal(t, tc.size, storeit.Total,
			"Did not retrieve the correct number of recipes, expected "+strconv.Itoa(int(int8(tc.size)))+".")

	}

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
		assert.Equal(t, tc.size, len(recipes), "Did not retrieve the correct number of recipes, expected "+strconv.Itoa(tc.size)+".")
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
	var last models.Recipe
	var response models.Recipe
	initialize.Db.Table("recipe").Last(&last)
	lastNum := last.Rid

	testRecipes = append(testRecipes,
		test{Rid: uint(lastNum + 1), Title: "Test Recipe 1", Ingredients: "paprika,pepper,serrano",
			Instructions: "stir gently", Image_name: "test_image_1", Uid: 2},
		test{Rid: uint(lastNum + 2), Title: "Test Recipe 2", Ingredients: "pasta",
			Instructions: "heat in microwave", Image_name: "test_image_2", Uid: 2},
		test{Rid: uint(lastNum + 3), Title: "Test Recipe 3", Ingredients: "deviled eggs, legumes",
			Instructions: "party time", Image_name: "test_image_3", Uid: 2},
	)

	for tc := range testRecipes {
		jsonValue, _ := json.Marshal(testRecipes[tc])
		req, _ := http.NewRequest("POST", "/server/recipes/add", bytes.NewBuffer(jsonValue))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)
		t.Log(testRecipes[tc].Rid)

		json.Unmarshal(w.Body.Bytes(), &response)

		assert.Equal(t, http.StatusOK, w.Code, "Unable to post recipe "+testRecipes[tc].Title)
		assert.Equal(t, response.Rid, testRecipes[tc].Rid, "Recipe ID was not the same as expected")
		assert.Equal(t, response.Title, testRecipes[tc].Title, "Recipe title was not the same as expected")
		assert.Equal(t, response.Instructions, testRecipes[tc].Instructions, "Recipe instructions were not the same as expected")
		assert.Equal(t, response.Ingredients, testRecipes[tc].Ingredients, "Recipe ingredients were not the same as expected")
		assert.Equal(t, response.Image_Name, testRecipes[tc].Image_name, "Recipe image name was not the same as expected")
		assert.Equal(t, response.Uid, testRecipes[tc].Uid, "Recipe user ID was not the same as expected")
	}

}

func TestRecipeEdit(t *testing.T) {
	r := SetUpRouter()
	r.PUT("/server/recipes/edit/:id", handler.EditRecipe())
	type test struct {
		Rid          uint   `json:"rid"`
		Title        string `json:"title"`
		Instructions string `json:"instructions"`
		Ingredients  string `json:"ingredients"`
		Image_name   string `json:"image_name"`
		Uid          uint   `json:"uid"`
	}

	var testRecipes []test
	var last models.Recipe
	var response models.Recipe
	initialize.Db.Table("recipe").Last(&last)
	lastNum := last.Rid

	testRecipes = append(testRecipes,
		test{Rid: uint(lastNum - 2), Title: "Edit Recipe 1", Ingredients: "paprika,pepper,serranooooo",
			Instructions: "mix gently", Image_name: "test_image_1234", Uid: 2},
		test{Rid: uint(lastNum - 1), Title: "Edit Recipe 2", Ingredients: "pasta pepperoni",
			Instructions: "burn in microwave", Image_name: "test_image_yes", Uid: 2},
		test{Rid: uint(lastNum), Title: "Edit Recipe 3", Ingredients: "deviled eggs, no legumes",
			Instructions: "party time yo", Image_name: "test_image_no", Uid: 2},
	)

	rids := []string{strconv.FormatInt(int64(lastNum-2), 10),
		strconv.FormatInt(int64(lastNum-1), 10),
		strconv.FormatInt(int64(lastNum), 10)}

	tc := 0
	for _, val := range rids {
		t.Log(testRecipes[tc].Rid)

		jsonValue, _ := json.Marshal(testRecipes[tc])
		req, _ := http.NewRequest("PUT", "/server/recipes/edit/"+val, bytes.NewBuffer(jsonValue))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		printVal, _ := strconv.Atoi(val)
		printVal += 3
		assert.Equal(t, http.StatusOK, w.Code, "Could not edit recipe "+strconv.Itoa(printVal))

		json.Unmarshal(w.Body.Bytes(), &response)
		assert.Equal(t, testRecipes[tc].Title, response.Title, "Recipe title was not the same as expected")
		assert.Equal(t, testRecipes[tc].Rid, response.Rid, "Recipe ID was not the same as expected")
		assert.Equal(t, testRecipes[tc].Instructions, response.Instructions, "Recipe instructions were not the same as expected")
		assert.Equal(t, testRecipes[tc].Ingredients, response.Ingredients, "Recipe ingredients were not the same as expected")
		assert.Equal(t, testRecipes[tc].Image_name, response.Image_Name, "Recipe image name was not the same as expected")
		assert.Equal(t, testRecipes[tc].Uid, response.Uid, "Recipe user ID was not the same as expected")
		tc++
	}

	bogus := "55000"
	req, _ := http.NewRequest("PUT", "/server/recipes/edit/"+bogus, nil)
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code, "Could not edit recipe "+bogus)
}

func TestRecipeDelete(t *testing.T) {
	r := SetUpRouter()
	r.DELETE("/server/recipes/delete/:id", handler.DeleteRecipe())

	var last models.Recipe
	initialize.Db.Table("recipe").Last(&last)
	lastNum := last.Rid

	rids := []string{strconv.FormatInt(int64(lastNum-2), 10),
		strconv.FormatInt(int64(lastNum-1), 10),
		strconv.FormatInt(int64(lastNum), 10)}

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

	assert.Equal(t, http.StatusBadRequest, w.Code, "Could not delete recipe "+bogus)
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
