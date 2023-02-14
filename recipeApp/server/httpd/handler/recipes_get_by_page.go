package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RecipeGetByPage() gin.HandlerFunc {
	return func(c *gin.Context) {
		var recipes []models.Recipe

		page, _ := strconv.Atoi(c.Query("page"))
		if page <= 0 {
			page = 1
		}

		pageSize, _ := strconv.Atoi(c.Query("per_page"))

		switch {
		case pageSize <= 0:
			pageSize = 10
		}

		offset := (page - 1) * pageSize

		initialize.Db.Table("recipe").Offset(offset).Limit(pageSize).Find(&recipes)

		c.JSON(http.StatusOK, recipes)
	}
}
