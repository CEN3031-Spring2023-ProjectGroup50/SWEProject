package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

// @Summary Check an individual recipe by user id and recipe id for favorite status.
// @Accept json
// @Produce json
// @Param rid	query	int	true	"recipe id of favorite to check"	default(0)
// @Param uid	query	int	true "specify a user id"	default(0)
// @Success 200
// @Failure 400
// @Router /server/favorites/check [get]
func CheckFavorite() gin.HandlerFunc {
	return func(c *gin.Context) {

		uid, _ := strconv.Atoi(c.Query("uid"))
		uuid := uint(uid)
		rid, _ := strconv.Atoi(c.Query("rid"))
		urid := uint(rid)

		fav := models.Favorite{

			Userid:   uuid,
			Recipeid: urid,
		}

		initialize.Db.Table("favorites").Select("Fid").Where("userid = ? AND recipeid = ?", fav.Userid, fav.Recipeid).Find(&fav)

		c.JSON(http.StatusOK, fav.Fid)

	}

}
