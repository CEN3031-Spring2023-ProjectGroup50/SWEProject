package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

func RecipeGetCount() gin.HandlerFunc {

	return func(c *gin.Context) {
		var total int64
		initialize.Db.Table("recipe_1").Model(models.Rwimage{}).Count(&total)

		c.JSON(http.StatusOK, map[string]int64{"total": total})
	}

}
