package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"recipeApp/httpd/handler"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"
	"strings"
	"testing"

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
		Rid                 uint   `json:"rid"`
		Title               string `json:"title"`
		Instructions        string `json:"instructions"`
		Ingredients         string `json:"ingredients"`
		Image_name          string `json:"image_name"`
		Cleaned_ingredients string `json:"cleaned_ingredients"`
	}

	var testRecipes []test

	testRecipes = append(testRecipes,
		test{Rid: 25000, Title: "Test Recipe 1", Ingredients: "paprika,pepper,serrano",
			Instructions: "stir gently", Image_name: "test_image_1", Cleaned_ingredients: "na"},
		test{Rid: 25001, Title: "Test Recipe 2", Ingredients: "pasta",
			Instructions: "heat in microwave", Image_name: "test_image_2", Cleaned_ingredients: "na"},
		test{Rid: 25002, Title: "Test Recipe 3", Ingredients: "deviled eggs, legumes",
			Instructions: "party time", Image_name: "test_image_3", Cleaned_ingredients: "na"},
	)

	for tc := range testRecipes {
		jsonValue, _ := json.Marshal(testRecipes[tc])
		req, _ := http.NewRequest("POST", "/server/recipes/add", bytes.NewBuffer(jsonValue))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()
		r.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code, "Unable to post recipe "+testRecipes[tc].Title)

	}

	jsonValue, _ := json.Marshal(testRecipes[1])
	req, _ := http.NewRequest("POST", "/server/recipes/add", bytes.NewBuffer(jsonValue))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code, "Posted a non-unique recipe "+testRecipes[1].Title)

}

func TestRecipeDelete(t *testing.T) {
	r := SetUpRouter()
	r.DELETE("/server/recipes/delete/:id", handler.DeleteRecipe())
	rids := []string{"25000", "25001", "25002"}

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
