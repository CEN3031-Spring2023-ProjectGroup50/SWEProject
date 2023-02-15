package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

// @Summary delete a recipe
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/recipes/{id} [delete]
func DeleteRecipe() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")

		var recipe models.Recipe
		result := initialize.Db.Table("recipe").Where("rid = ?", id).Delete(&recipe)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete recipe",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
	}
}
