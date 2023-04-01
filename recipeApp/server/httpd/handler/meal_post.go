package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"time"

	"github.com/gin-gonic/gin"
)

type mealPostRequest struct {

	//Mid      uint `json:"mid"`
	Userid   uint      `json:"userid"`
	Recipeid uint      `json:"recipeid"`
	Date     time.Time `json:"date"`
}

func CreateMeal() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestBody := mealPostRequest{}

		if c.Bind(&requestBody) != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}
		meal := models.Meal{
			//Mid:      requestBody.Mid,
			Userid:   requestBody.Userid,
			Recipeid: requestBody.Recipeid,
			Date:     requestBody.Date,
		}
		result := initialize.Db.Table("meal").Create(&meal)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create meal",
			})
			return
		}
		var response recipePostRequest

		initialize.Db.Table("recipe").Where("mid = ?", meal.Mid).Find(&response)

		c.JSON(http.StatusOK, response)

	}

}
