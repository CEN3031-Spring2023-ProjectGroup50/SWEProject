package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func RwimageGetByPage() gin.HandlerFunc {
	return func(c *gin.Context) {
		var recipes []models.Rwimage

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

		initialize.Db.Table("recipe_1").Order("rid").Offset(offset).Limit(pageSize).Find(&recipes)

		if len(recipes) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "No recipes returned",
			})
			return
		}

		c.JSON(http.StatusOK, recipes)
	}
}
