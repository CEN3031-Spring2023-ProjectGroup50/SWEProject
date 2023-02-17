package main

import (
	_ "recipeApp/docs"
	"recipeApp/httpd/handler"
	"recipeApp/initialize"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

//@title Mallow Recipe Server API
//@version 1.0
//@description This is the server for the Mallow Recipe Application

//@contact.name Wes Ahearn, Seth Paul
//@host localhost:5000
//@license.name unknown
//@BasePath /

func init() {
	initialize.InitDB()
	initialize.SyncDB()
}

func main() {

	r := gin.Default()

	server := r.Group("/server")
	{
		server.POST("/register", handler.Register)
		server.POST("/login", handler.Login)
		server.GET("/recipes", handler.RecipeGet())
		server.POST("/recipes/add", handler.CreateRecipe())
		server.GET("/recipes/bypage", handler.RecipeGetByPage())
		server.DELETE("/recipes/delete/:id", handler.DeleteRecipe())
		server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	}

	r.Run("0.0.0.0:5000") //Listen and serve

}
