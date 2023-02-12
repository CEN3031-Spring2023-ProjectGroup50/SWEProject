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

		if len(paramPairs["id"]) > 0 {
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
		} else if len(paramPairs["ingredient"]) > 0 {
			ingredientText := "%" + paramPairs["ingredient"][0] + "%"

			var recipe []models.Recipe
			initialize.Db.Table("recipe").
				Where("ingredients LIKE ?", ingredientText).Find(&recipe)

			// return error if recipe not found
			if len(recipe) == 0 {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "No recipes found containing the term " + c.Param("ingredient"),
				})
				return
			}

			c.JSON(http.StatusOK, recipe)
		} else {
			var recipes []models.Recipe
			initialize.Db.Table("recipe").Find(&recipes)

			c.JSON(http.StatusOK, recipes)
		}

	}
}
