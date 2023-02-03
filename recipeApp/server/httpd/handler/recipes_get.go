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

func RecipesGetAll() gin.HandlerFunc {
	return func(c *gin.Context) {
		var recipes []models.Recipe
		initialize.Db.Table("recipe").Find(&recipes)

		c.JSON(http.StatusOK, recipes)
	}
}
