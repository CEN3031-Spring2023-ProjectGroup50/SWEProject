package handler

import (
	"net/http"
	"recipeApp/initialize"
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

	type userRecipe struct {
		Rid          uint `gorm:"primaryKey; column:rid"`
		Title        string
		Ingredients  string
		Instructions string
		Image_Name   string
		Uid          uint
		Email        string
		Image        []byte `gorm:"type:bytea"`
	}

	return func(c *gin.Context) {

		var recipes []userRecipe

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

			initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Where("uid =?", uid).Order("rid").Offset(offset).Limit(pageSize).Find(&recipes)
		} else {
			initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Order("rid").Offset(offset).Limit(pageSize).Find(&recipes)
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
