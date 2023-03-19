package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary get a json object (recipes) of default 10 recipes at a time
// @Accept json
// @Produce json
// @Param page	query	int	false	"specify page number"	default(1)
// @Param per_page	query	int	false	"results per page"	default(10)
// @Success 200
// @Failure 400
// @Router /server/recipes/bypage [get]
func RecipeGetByPage() gin.HandlerFunc {
	return func(c *gin.Context) {

		var recipes []models.Recipe

		uid, _ := strconv.Atoi(c.Query("uid"))

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

		if uid != 0 {
			//passedID, _ := strconv.Atoi(body.Uid)
			initialize.Db.Table("recipe").Where("uid =?", uid).Order("rid").Offset(offset).Limit(pageSize).Find(&recipes)
		} else {
			initialize.Db.Table("recipe").Order("rid").Offset(offset).Limit(pageSize).Find(&recipes)
		}

		if len(recipes) == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "No recipes returned",
			})
			return
		}

		c.JSON(http.StatusOK, recipes)
	}
}
