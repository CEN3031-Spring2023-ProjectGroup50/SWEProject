package main

import (
	"recipeApp/controllers"
	"recipeApp/httpd/handler"
	"recipeApp/initialize"

	"github.com/gin-gonic/gin"
)

func init() {
	initialize.InitDB()
	initialize.SyncDB()
}

func main() {

	r := gin.Default()

	server := r.Group("/server")
	{
		server.POST("/register", controllers.Register)
		server.POST("/login", controllers.Login)
		server.GET("/recipes", handler.RecipeGet())
		server.POST("/recipes/add", handler.CreateRecipe())
		server.GET("/recipes/bypage", handler.RecipeGetByPage())
		server.DELETE("/recipes/delete/:id", handler.DeleteRecipe())
	}

	r.Run("0.0.0.0:5000") //Listen and serve

}
