package handler

import (
	"net/http"
	"recipeApp/httpd/platform/newsfeed"

	"github.com/gin-gonic/gin"
)

func NewsfeedGet(feed *newsfeed.Repo) gin.HandlerFunc {
	return func(c *gin.Context) {
		result := feed.GetAll()
		c.JSON(http.StatusOK, result)
	}
}
