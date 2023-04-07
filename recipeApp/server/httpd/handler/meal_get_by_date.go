package handler

import (
	"net/http"
	"recipeApp/initialize"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// @Summary Get a list of meals in predefined date range.
// @Accept json
// @Produce json
// @Param date	query	string	true	"specify start date"	default(2023-04-01)
// @Param uid	query	int	true "specify a user id"	default(1)
// @Success 200
// @Failure 400
// @Router /server/meals/bydate [get]
func MealGetByDate() gin.HandlerFunc {

	type userMeals struct {
		Mid          uint
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

		initialize.Db.Table("meals").Select("meals.mid,meals.date, meals.mealtype, recipe.title, recipe.ingredients, recipe.instructions, recipe.image_name, users.email, recipe.image").
			Joins("JOIN recipe ON meals.recipeid = recipe.rid").
			Joins("JOIN users ON meals.userid = users.id").
			Where("meals.userid = ? AND meals.date BETWEEN ? AND ?", uid, beginString, endString).
			Find(&meal)

		c.JSON(http.StatusOK, meal)
	}

}
