package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

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
