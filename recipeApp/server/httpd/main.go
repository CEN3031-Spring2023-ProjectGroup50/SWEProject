package main

import (
	"recipeApp/controllers"
	"recipeApp/httpd/handler"
	"recipeApp/httpd/platform/newsfeed"
	"recipeApp/initialize"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initialize.InitDB()
	initialize.SyncDB()
}

func main() {
	feed := newsfeed.New()

	r := gin.Default()

	// initialize CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization",
			"Cache-Control"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	server := r.Group("/server")
	{
		server.GET("/ping", handler.PingGet())
		server.GET("/newsfeed", handler.NewsfeedGet(feed))
		server.GET("/recipes", handler.RecipesGetAll())
		server.GET("/recipes/:id", handler.RecipeGetID())
		server.POST("/newsfeed", handler.NewsfeedPost(feed))
		server.POST("/register", controllers.Register)
		server.POST("/login", controllers.Login)
		server.GET("/account", controllers.Account)
		server.POST("/recipes/add", handler.CreateRecipe())
		server.DELETE("/recipes/delete/:id", handler.DeleteRecipe())
	}

	r.Run("0.0.0.0:5000") //Listen and serve

}
