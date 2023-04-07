package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

type mealEditRequest struct {
	Mid      uint   `json:"mid"`
	Date     string `json:"date"`
	Mealtype string `json:"mealtype"`
	Recipeid uint   `json:"recipeid"`
}

// @Summary update a mealplan item in the database
// @param requestBody body mealEditRequest	true "meal data"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/meals/edit [put]
func EditMeal() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestBody := mealEditRequest{}

		if c.Bind(&requestBody) != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}

		var meal models.Meal
		initialize.Db.Table("meals").Where("mid = ?", requestBody.Mid).Find(&meal)

		result := initialize.Db.Table("meals").Select("date", "mealtype", "recipeid").
			Where("mid = ?", meal.Mid).Updates(
			map[string]interface{}{
				"date":     requestBody.Date,
				"mealtype": requestBody.Mealtype,
				"recipeid": requestBody.Recipeid,
			})

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to update meal",
			})
			return
		}
		initialize.Db.Table("meals").Where("mid = ?", meal.Mid).Find(&meal)
		c.JSON(http.StatusOK, meal)

	}

}
