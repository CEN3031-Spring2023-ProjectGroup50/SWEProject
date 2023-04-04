package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
)

// @Summary delete a favorite item from the database
// @Accept json
// @Produce json
// @Param uid	path	int	true	"user id of favorite to delete"
// @Param rid	path	int	true	"recipe id of favorite to delete"
// @Success 200
// @Failure 400
// @Router /server/favorites/delete/{uid}/{rid} [delete]
func DeleteFavorite() gin.HandlerFunc {
	return func(c *gin.Context) {
		uid := c.Param("uid")
		rid := c.Param("rid")

		var fav models.Favorite
		initialize.Db.Table("favorites").Where("userid = ? AND recipeid = ?", uid, rid).Find(&fav)
		if fav.Fid == 0 {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete favorite",
			})
			return
		}
		result := initialize.Db.Table("favorites").Where("userid = ? AND recipeid = ?", uid, rid).Delete(&fav)

		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Could not delete favorite",
			})
			return

		}

		c.JSON(http.StatusOK, gin.H{})
	}
}
