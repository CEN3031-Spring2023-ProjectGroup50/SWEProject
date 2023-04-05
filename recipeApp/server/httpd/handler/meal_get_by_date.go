package handler

import (
	"net/http"
	"recipeApp/initialize"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func MealGetByDate() gin.HandlerFunc {

	type userMeals struct {
		Date         string
		Mealtype     string
		Title        string
		Ingredients  string
		Instructions string
		Image_Name   string
		Email        string
		Image        []byte `gorm:"type:bytea"`
	}

	return func(c *gin.Context) {

		var meal []userMeals

		uid, _ := strconv.Atoi(c.Query("uid"))
		date := c.Query("date")

		begin, _ := time.Parse("2006-01-02", date)
		end := begin.AddDate(0, 0, 6)

		beginString := begin.Format("2006-01-02")
		endString := end.Format("2006-01-02")

		initialize.Db.Table("meals").Select("meals.date, meals.mealtype, recipe.title, recipe.ingredients, recipe.instructions, recipe.image_name, users.email, recipe.image").
			Joins("JOIN recipe ON meals.recipeid = recipe.rid").
			Joins("JOIN users ON meals.userid = users.id").
			Where("meals.userid = ? AND meals.date BETWEEN ? AND ?", uid, beginString, endString).
			Find(&meal)

		c.JSON(http.StatusOK, meal)
	}

}
