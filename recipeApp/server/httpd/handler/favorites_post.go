package handler

import (
	"fmt"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strings"

	"github.com/gin-gonic/gin"
)

type favPostRequest struct {
	Userid   uint `json:"userid"`
	Recipeid uint `json:"recipeid"`
}

// @Summary add a favorite item to the database
// @param requestBody body favPostRequest	true "favorite data"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/favorites/add [post]
func AddFavorite() gin.HandlerFunc {
	return func(c *gin.Context) {

		requestBody := favPostRequest{}

		if c.Bind(&requestBody) != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed to read body",
			})
			return
		}
		fav := models.Favorite{

			Userid:   requestBody.Userid,
			Recipeid: requestBody.Recipeid,
		}
		recipe := models.Recipe{
			Rid: 0,
		}
		initialize.Db.Table("recipe").Where(("rid = ?"), fav.Recipeid).Find(&recipe)

		result := initialize.Db.Table("favorites").Create(&fav)

		if result.Error != nil {
			fmt.Print(result.Error)
			if strings.Contains(result.Error.Error(), "unique_recipe") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Recipe already added as favorite",
				})
				return
			} else if strings.Contains(result.Error.Error(), "favs_user") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "User does not exist",
				})
				return
			} else if strings.Contains(result.Error.Error(), "favs_recipe") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Recipe does not exist",
				})
				return
			} else {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Failed to add favorite",
				})
				return
			}

		}
		var response models.Favorite

		initialize.Db.Table("favorites").Where("fid = ?", fav.Fid).Find(&response)

		c.JSON(http.StatusOK, response)

	}

}
