package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func RecipeGetCount() gin.HandlerFunc {

	return func(c *gin.Context) {
		uid, _ := strconv.Atoi(c.Query("uid"))
		paramPairs := c.Request.URL.Query()
		var total int64

		var wildcardIngredients []string
		var wildcardInstructions []string
		var wildcardTitle []string
		for index := range paramPairs["keyword"] {
			wildcardIngredients = append(wildcardIngredients, "ingredients ILIKE '%"+paramPairs["keyword"][index]+"%'")
			wildcardInstructions = append(wildcardInstructions, "instructions ILIKE '%"+paramPairs["keyword"][index]+"%'")
			wildcardTitle = append(wildcardTitle, "title ILIKE '%"+paramPairs["keyword"][index]+"%'")
		}
		var wildcardSoloIngredients []string
		for index := range paramPairs["ingredient"] {
			wildcardSoloIngredients = append(wildcardSoloIngredients, "ingredients ILIKE '%"+paramPairs["ingredient"][index]+"%'")
		}

		if len(paramPairs["keyword"]) > 0 {

			if uid == 0 {

				initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND ")).
					Order("rid").Model(models.Recipe{}).Count(&total)

			} else {
				subq := initialize.Db.Table("recipe").Where("uid =?", uid)

				initialize.Db.Table("(?) as u", subq).Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND ")).
					Order("rid").Count(&total)

			}
		} else if len(paramPairs["ingredient"]) > 0 {

			if uid == 0 {

				initialize.Db.Table("recipe").Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Count(&total)
			} else {
				subq := initialize.Db.Table("recipe").Where("uid =?", uid)
				initialize.Db.Table("(?) as u", subq).Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Count(&total)
			}

		} else {
			if uid == 0 {
				initialize.Db.Table("recipe").Model(models.Recipe{}).Count(&total)
			} else {
				initialize.Db.Table("recipe").Where("uid =?", uid).Model(models.Recipe{}).Count(&total)
			}
		}

		c.JSON(http.StatusOK, map[string]int64{"total": total})
	}

}
