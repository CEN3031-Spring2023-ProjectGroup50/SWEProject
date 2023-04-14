package handler

import (
	"net/http"
	"recipeApp/initialize"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// @Summary Get a list of user's favorite recipes in predefined amounts, searchable by keyword and ingredient.
// @Accept json
// @Produce json
// @Param page	query	int	false	"specify page number"	default(1)
// @Param per_page	query	int	false	"results per page"	default(10)
// @Param keyword	query	[]string	false	"specify one or more keywords"	collectionFormat(multi)
// @Param ingredient	query	[]string false "specify one or more ingredients"	collectionFormat(multi)
// @Param uid	query	int	false "specify a user id"	default(0)
// @Success 200
// @Failure 400
// @Router /server/favorites/bypage [get]
func FavoritesGetByPage() gin.HandlerFunc {

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

		var recipe []userRecipe

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

		paramPairs := c.Request.URL.Query()

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
				Order("fid").Offset(offset).Limit(pageSize).Find(&recipe)

			c.JSON(http.StatusOK, recipe)

		} else if len(paramPairs["keyword"]) > 0 {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").
				Where("userid =?", uid).
				Where(
					initialize.Db.Where(strings.Join(wildcardIngredients, " AND ")).
						Or(strings.Join(wildcardInstructions, " AND ")).
						Or(strings.Join(wildcardTitle, " AND ")),
				).
				Order("fid").Offset(offset).Limit(pageSize).Find(&recipe)

			c.JSON(http.StatusOK, recipe)

		} else if len(paramPairs["ingredient"]) > 0 {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").
				Where("userid =?", uid).
				Where(strings.Join(wildcardSoloIngredients, " AND ")).
				Order("fid").Offset(offset).Limit(pageSize).Find(&recipe)

			c.JSON(http.StatusOK, recipe)

		} else {

			initialize.Db.Table("favorites").Select("favorites.userid", "recipe.*").Joins("join recipe on recipe.rid = favorites.recipeid").Where("userid =?", uid).Order("fid").Offset(offset).Limit(pageSize).Find(&recipe)

			c.JSON(http.StatusOK, recipe)
		}

	}
}
