package handler

import (
	"net/http"
	"recipeApp/initialize"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// @Summary Get the correct count of user's favorite recipes for any pagination scenario.
// @Accept json
// @Produce json
// @Param keyword	query	[]string	false	"specify one or more keywords"	collectionFormat(multi)
// @Param ingredient	query	[]string false "specify one or more ingredients"	collectionFormat(multi)
// @Param uid	query	int	false "specify a user id"	default(0)
// @Success 200
// @Failure 400
// @Router /server/favoritecount [get]
func FavoritesGetCount() gin.HandlerFunc {

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

		if len(paramPairs["keyword"]) > 0 && len(paramPairs["ingredient"]) > 0 {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").
				Where("userid =?", uid).
				Where(
					initialize.Db.Where(strings.Join(wildcardIngredients, " AND ")).
						Or(strings.Join(wildcardInstructions, " AND ")).
						Or(strings.Join(wildcardTitle, " AND ")),
				).
				Where(strings.Join(wildcardSoloIngredients, " AND ")).
				Order("fid").Count(&total)

		} else if len(paramPairs["keyword"]) > 0 {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").
				Where("userid =?", uid).
				Where(
					initialize.Db.Where(strings.Join(wildcardIngredients, " AND ")).
						Or(strings.Join(wildcardInstructions, " AND ")).
						Or(strings.Join(wildcardTitle, " AND ")),
				).
				Order("fid").Count(&total)

		} else if len(paramPairs["ingredient"]) > 0 {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").
				Where("userid =?", uid).
				Where(strings.Join(wildcardSoloIngredients, " AND ")).
				Order("fid").Count(&total)

		} else {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").Where("userid =?", uid).Count(&total)

		}
		c.JSON(http.StatusOK, map[string]int64{"total": total})
	}
}
