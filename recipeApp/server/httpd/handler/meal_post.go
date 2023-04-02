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
	Userid   uint   `json:"userid"`
	Recipeid uint   `json:"recipeid"`
	Date     string `json:"date"`
	Mealtype string `json:"mealtype"`
}

// @Summary post a mealplan item to the database
// @param requestBody body mealPostRequest	true "meal data"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/meals/add [post]
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

			Userid:   requestBody.Userid,
			Recipeid: requestBody.Recipeid,
			Date:     requestBody.Date,
			Mealtype: requestBody.Mealtype,
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
