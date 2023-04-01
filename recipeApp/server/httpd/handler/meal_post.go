package handler

import (
	"fmt"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strings"

	"github.com/gin-gonic/gin"
)

type mealPostRequest struct {

	//Mid      uint `json:"mid"`
	Userid   uint   `json:"userid"`
	Recipeid uint   `json:"recipeid"`
	Date     string `json:"date"`
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
		//parsedDate, _ := time.Parse("2006-01-02", requestBody.Date)
		meal := models.Meal{
			//Mid:      requestBody.Mid,
			Userid:   requestBody.Userid,
			Recipeid: requestBody.Recipeid,
			Date:     requestBody.Date,
		}
		recipe := models.Recipe{
			Rid: 0,
		}
		initialize.Db.Table("recipe").Where(("rid = ?"), meal.Recipeid).Find(&recipe)

		result := initialize.Db.Table("meals").Create(&meal)

		if result.Error != nil {
			fmt.Print(result.Error)
			if strings.Contains(result.Error.Error(), "meals_user") {
				fmt.Print("User does not exist")
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "User does not exist",
				})
				return
			} else if strings.Contains(result.Error.Error(), "meals_recipe") {
				fmt.Print("Recipe does not exist")
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Recipe does not exist",
				})
				return
			} else {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Failed to create meal",
				})
				return
			}

		}
		var response mealPostRequest

		initialize.Db.Table("meals").Where("mid = ?", meal.Mid).Find(&response)

		c.JSON(http.StatusOK, response)

	}

}
