package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

// @Summary delete a meal
// @Accept json
// @Produce json
// @Param id	path	int	true	"id of meal to delete"
// @Success 200
// @Failure 400
// @Router /server/meals/delete/{id} [delete]
func DeleteMeal() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		var meal models.Meal
		result := initialize.Db.Table("meals").Where("mid = ?", id).Find(&meal)
		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not find recipe",
			})
			return
		}
		result = initialize.Db.Table("meals").Where("mid = ?", id).Delete(&meal)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete recipe",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
	}
}
