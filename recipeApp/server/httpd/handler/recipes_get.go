package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

/*func RecipesGetAll(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		result := initialize.Db.Find(&recipe)
		c.JSON(http.StatusOK, result)
	}
}*/

func RecipeGetID() gin.HandlerFunc {
	// get recipe by ID
	return func(c *gin.Context) {
		id := c.Param("id")

		var recipe models.Recipe
		initialize.Db.Table("recipe").Where("rid = ?", id).First(&recipe)

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
