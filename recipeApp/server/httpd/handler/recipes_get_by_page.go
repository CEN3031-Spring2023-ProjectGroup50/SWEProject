package handler

import (
	"net/http"
	"recipeApp/initialize"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// @Summary get a json object (recipes) of default 10 recipes at a time
// @Accept json
// @Produce json
// @Param page	query	int	false	"specify page number"	default(1)
// @Param per_page	query	int	false	"results per page"	default(10)
// @Param keyword	query	[]string	false	"specify one or more keywords"	collectionFormat(multi)
// @Param ingredient	query	[]string false "specify one or more ingredients"	collectionFormat(multi)
// @Param uid	query	int	false "specify a user id"	default(0)
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

			if uid == 0 {

				subq1 := initialize.Db.Table("recipe").Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND "))

				initialize.Db.Table("users").Select("users.email", "u.*").Joins("join users on u.uid = users.id").Table("(?) as u", subq1).
					Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)

			} else {
				subq := initialize.Db.Table("recipe").Where("uid =?", uid)

				subq1 := initialize.Db.Table("(?) as u", subq).Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND "))

				initialize.Db.Table("users").Select("users.email", "u.*").Joins("join users on u.uid = users.id").Table("(?) as u", subq1).
					Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)
			}
			c.JSON(http.StatusOK, recipe)

		} else if len(paramPairs["keyword"]) > 0 {

			if uid == 0 {

				initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)

			} else {

				subq := initialize.Db.Table("recipe").Where("uid =?", uid)

				initialize.Db.Table("users").Select("users.email", "u.*").Joins("join users on u.uid = users.id").Table("(?) as u", subq).Where(strings.Join(wildcardIngredients, " AND ")).
					Or(strings.Join(wildcardInstructions, " AND ")).Or(strings.Join(wildcardTitle, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)

			}
			c.JSON(http.StatusOK, recipe)

		} else if len(paramPairs["ingredient"]) > 0 {

			if uid == 0 {

				initialize.Db.Table("users").Select("users.email", "recipe.*").
					Joins("join recipe on recipe.uid = users.id").Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)
			} else {

				subq := initialize.Db.Table("recipe").Where("uid =?", uid)
				initialize.Db.Table("users").Select("users.email", "u.*").Joins("join users on u.uid = users.id").Table("(?) as u", subq).
					Where(strings.Join(wildcardSoloIngredients, " AND ")).
					Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)
			}

			c.JSON(http.StatusOK, recipe)
		} else {

			if uid != 0 {

				initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Where("uid =?", uid).Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)
			} else {
				initialize.Db.Table("users").Select("users.email", "recipe.*").Joins("join recipe on recipe.uid = users.id").Order("rid").Offset(offset).Limit(pageSize).Find(&recipe)
			}
			c.JSON(http.StatusOK, recipe)
		}

	}
}
