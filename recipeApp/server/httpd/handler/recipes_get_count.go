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
			initialize.Db.Table("recipe").Model(models.Recipe{}).Count(&total)
		} else {
			initialize.Db.Table("recipe").Where("uid =?", uid).Model(models.Recipe{}).Count(&total)
		}

		c.JSON(http.StatusOK, map[string]int64{"total": total})
	}

}
