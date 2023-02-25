package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"recipeApp/httpd/handler"
	"recipeApp/models"
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

	assert.Equal(t, http.StatusOK, w.Code, "Did not retrieve all recipes.")
	assert.NotEmpty(t, recipes, "Empty result for all recipes.")
	assert.Greater(t, len(recipes), 13000, "Not enough recipes returned.")

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
