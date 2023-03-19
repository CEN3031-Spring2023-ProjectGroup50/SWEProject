package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

type recipeEditRequest struct {
	Rid          uint   `json:"rid"`
	Title        string `json:"title"`
	Ingredients  string `json:"ingredients"`
	Instructions string `json:"instructions"`
	Image_Name   string `json:"image_name"`
	Uid          uint   `json:"uid"`
}

// @Summary edit a recipe
// @Accept json
// @Produce json
// @Param id	path	int	true	"id of recipe to edit"
// @Param requestBody body recipeEditRequest	true "modified recipe data"
// @Success 200
// @Failure 400
// @Router /server/recipes/edit/{id} [put]
func EditRecipe() gin.HandlerFunc {
	return func(c *gin.Context) {
		requestBody := recipeEditRequest{}

		if c.Bind(&requestBody) != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}

		id := c.Param("id")
		mallowid := uint(1)

		var recipe models.Recipe
		initialize.Db.Table("recipe").Where("rid = ?", id).Find(&recipe)
		if recipe.Uid == mallowid || recipe.Uid == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not edit recipe",
			})
			return
		}

		result := initialize.Db.Table("recipe").Where("rid = ? and uid !=?", id, mallowid).Updates(
			map[string]interface{}{
				"title":        requestBody.Title,
				"ingredients":  requestBody.Ingredients,
				"instructions": requestBody.Instructions,
				"image_name":   requestBody.Image_Name,
			})

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not edit recipe",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
	}
}
