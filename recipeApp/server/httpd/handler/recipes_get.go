package handler

import (
	"fmt"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strings"

	"github.com/gin-gonic/gin"
)

// @Summary a suite of queries for returning recipes by search term
// @Accept json
// @Produce json
// @Param keyword	query	[]string	false	"specify one or more keywords"
// @Param ingredient	query	[]string false "specify one or more ingredients"
// @Param id	query	int	false "specify a recipe by id"
// @Success 200
// @Failure 400
// @Router /server/recipes [get]
func RecipeGet() gin.HandlerFunc {
	return func(c *gin.Context) {
		paramPairs := c.Request.URL.Query()
		for key, values := range paramPairs {
			fmt.Printf("key = %v, value(s) = %v\n", key, values)
		}

		if len(paramPairs["keyword"]) > 0 {
			var recipe []models.Recipe
			var wildcardIngredients []string
			var wildcardInstructions []string
			var wildcardTitle []string
			for index := range paramPairs["keyword"] {
				wildcardIngredients = append(wildcardIngredients, "ingredients ILIKE '%"+paramPairs["keyword"][index]+"%'")
				wildcardInstructions = append(wildcardInstructions, "instructions ILIKE '%"+paramPairs["keyword"][index]+"%'")
				wildcardTitle = append(wildcardTitle, "title ILIKE '%"+paramPairs["keyword"][index]+"%'")
			}

			initialize.Db.Table("recipe").Where(strings.Join(wildcardIngredients, " AND ")).
				Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND ")).Find(&recipe)

			if len(recipe) == 0 {
				c.JSON(http.StatusBadRequest, gin.H{
					//TODO - FIX FOR MULTIPLE STRINGS
					"error": "No recipes found containing the term " + paramPairs["keyword"][0],
				})
				return
			}

			c.JSON(http.StatusOK, recipe)
		} else if len(paramPairs["id"]) > 0 {
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
			fmt.Printf("this is of type %T", paramPairs["ingredient"])
			var wildcardIngredients []string
			for index := range paramPairs["ingredient"] {
				wildcardIngredients = append(wildcardIngredients, "ingredients ILIKE '%"+paramPairs["ingredient"][index]+"%'")
			}
			var recipe []models.Recipe
			initialize.Db.Table("recipe").Where(strings.Join(wildcardIngredients, " AND ")).Find(&recipe)

			if len(recipe) == 0 {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "No recipes found containing the searched terms.",
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
