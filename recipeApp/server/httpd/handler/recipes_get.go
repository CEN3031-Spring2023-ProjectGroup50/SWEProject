package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

func RecipeGetID() gin.HandlerFunc {
	// get recipe by ID
	return func(c *gin.Context) {
		id := c.Param("id")

		var recipe models.Recipe
		initialize.Db.Table("recipe").Where("rid = ?", id).First(&recipe)

		// return error if recipe not found
		if recipe.Rid == 0 && recipe.Title == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Recipe not found",
			})
			return
		}

		c.JSON(http.StatusOK, recipe)
	}
}

func RecipesGetAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		var recipes []models.Recipe
		initialize.Db.Table("recipe").Find(&recipes)

		c.JSON(http.StatusOK, recipes)
	}
}
