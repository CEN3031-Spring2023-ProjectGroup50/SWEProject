package main

import (
	"recipeApp/httpd/handler"
	"recipeApp/httpd/platform/newsfeed"
	"recipeApp/initialize"

	"github.com/gin-gonic/gin"
)

func init() {
	initialize.InitDB()
	initialize.SyncDB()
}

func main() {
	feed := newsfeed.New()

	r := gin.Default()

	server := r.Group("/server")
	{
		server.GET("/ping", handler.PingGet())
		server.GET("/newsfeed", handler.NewsfeedGet(feed))
		server.POST("/newsfeed", handler.NewsfeedPost(feed))
	}
	r.Run("0.0.0.0:5000") // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")

}
