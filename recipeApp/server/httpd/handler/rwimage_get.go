package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

func RwimageGet() gin.HandlerFunc {
	return func(c *gin.Context) {
		var recipes []models.Rwimage
		initialize.Db.Table("recipe_1").Find(&recipes)

		c.JSON(http.StatusOK, recipes)
	}

}
