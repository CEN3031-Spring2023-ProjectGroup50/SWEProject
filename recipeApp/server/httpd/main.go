package main

import (
	"recipeApp/controllers"
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
		server.GET("/recipes", handler.RecipeGet())
		server.POST("/newsfeed", handler.NewsfeedPost(feed))
		server.POST("/register", controllers.Register)
		server.POST("/login", controllers.Login)
		server.POST("/recipes/add", handler.CreateRecipe())
		server.GET("/recipes/bypage", handler.RecipeGetByPage())
		server.DELETE("/recipes/delete/:id", handler.DeleteRecipe())
	}

	r.Run("0.0.0.0:5000") //Listen and serve

}
