package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RecipeGetCount() gin.HandlerFunc {

	return func(c *gin.Context) {
		uid, _ := strconv.Atoi(c.Query("uid"))
		var total int64
		if uid == 0 {
			initialize.Db.Table("recipe_1").Model(models.Rwimage{}).Count(&total)
		} else {
			initialize.Db.Table("recipe_1").Where("uid =?", uid).Model(models.Rwimage{}).Count(&total)
		}

		c.JSON(http.StatusOK, map[string]int64{"total": total})
	}

}
