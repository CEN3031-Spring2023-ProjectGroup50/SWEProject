package handler

import (
	"fmt"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

func RecipeGet() gin.HandlerFunc {
	return func(c *gin.Context) {
		paramPairs := c.Request.URL.Query()
		for key, values := range paramPairs {
			fmt.Printf("key = %v, value(s) = %v\n", key, values)
		}

		//id := c.Param("id")
		if len(paramPairs["id"]) == 0 {
			var recipes []models.Recipe
			initialize.Db.Table("recipe").Find(&recipes)

			c.JSON(http.StatusOK, recipes)

		} else {
			var recipe models.Recipe
			initialize.Db.Table("recipe").Where("rid = ?", paramPairs["id"]).First(&recipe)

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
}

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

func RecipeGetIngredient() gin.HandlerFunc {
	// get recipe by ingredient db.Where("name LIKE ?", "%jin%").Find(&users)
	return func(c *gin.Context) {
		ingredientText := "%" + c.Param("ingredient") + "%"

		var recipe []models.Recipe
		initialize.Db.Table("recipe").Where("ingredients LIKE ?", ingredientText).Find(&recipe)

		// return error if recipe not found
		if len(recipe) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "No recipes found containing the term " + c.Param("ingredient"),
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
