package handler

/*import (
	"net/http"
	"recipeApp/httpd/platform/recipes"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

type recipePostRequest struct {
	ID                  uint   `json:"id"`
	Title               string `json:"title"`
	Ingredients         string `json:"ingredients"`
	Instructions        string `json:"instructions"`
	Image_Name          string `json:"image_name"`
	Cleaned_Ingredients string `json:cleaned_ings"`
}

func RecipePost(db *recipes.Repo) gin.HandlerFunc {
	return func(c *gin.Context) {
		requestBody := recipePostRequest{}
		c.Bind(&requestBody)

		item := models.Recipe{
			ID:                  requestBody.ID,
			Title:               requestBody.Title,
			Ingredients:         requestBody.Ingredients,
			Instructions:        requestBody.Instructions,
			Image_Name:          requestBody.Image_Name,
			Cleaned_Ingredients: requestBody.Cleaned_Ingredients,
		}
		result := initialize.Db.Create(&item)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to create user",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
		c.Status(http.StatusNoContent)
	}
}*/
