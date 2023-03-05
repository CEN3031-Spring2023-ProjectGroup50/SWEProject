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
// @Param id	path	int	true	"id of recipe to delete"
// @Success 200
// @Failure 400
// @Router /server/recipes/delete/{id} [delete]
func DeleteRecipe() gin.HandlerFunc {
	return func(c *gin.Context) {
		id := c.Param("id")
		mallowid := uint(1)
		var recipe models.Recipe
		initialize.Db.Table("recipe").Where("rid = ?", id).Find(&recipe)
		if recipe.Uid == mallowid {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete recipe",
			})
			return
		}
		result := initialize.Db.Table("recipe").Where("rid = ? and uid !=?", id, mallowid).Delete(&recipe)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete recipe",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
	}
}
