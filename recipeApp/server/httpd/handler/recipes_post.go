package handler

import (
	"fmt"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

type recipePostRequest struct {
	Rid          uint   `json:"rid"`
	Title        string `json:"title"`
	Ingredients  string `json:"ingredients"`
	Instructions string `json:"instructions"`
	Image_Name   string `json:"image_name"`
	Image        []byte `json:"image"`
	Uid          uint   `json:"uid"`
}

// @Summary post a recipe to the database
// @param requestBody body recipePostRequest	true "recipe data"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/recipes/add [post]
func CreateRecipe() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestBody := recipePostRequest{}

		if c.Bind(&requestBody) != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}

		recipe := models.Recipe{
			Rid:          requestBody.Rid,
			Title:        requestBody.Title,
			Ingredients:  requestBody.Ingredients,
			Instructions: requestBody.Instructions,
			Image_Name:   requestBody.Image_Name,
			Image:        requestBody.Image,
			Uid:          requestBody.Uid,
		}

		fmt.Printf("Incoming Image:  %s", requestBody.Image)
		fmt.Printf("Image: %s", recipe.Image)

		var last models.Recipe
		initialize.Db.Table("recipe").Last(&last)
		lastNum := last.Rid
		recipe.Rid = uint(lastNum + 1)

		result := initialize.Db.Table("recipe").Create(&recipe)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create recipe",
			})
			return

		}

		var response models.Recipe

		initialize.Db.Table("recipe").Where("rid = ?", recipe.Rid).Find(&response)

		c.JSON(http.StatusOK, response)
	}
}
