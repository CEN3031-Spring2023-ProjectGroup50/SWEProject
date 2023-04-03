package main

import (
	_ "recipeApp/docs"
	"recipeApp/httpd/handler"
	"recipeApp/initialize"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

//@title Mallow Recipe Server API
//@version 1.0
//@description This is the server for the Mallow Recipe Application

//@contact.name Wes Ahearn, Seth Paul
//@host localhost:5000
//@license.name Apache 2.0
//@BasePath /

func init() {
	initialize.InitDB()
	initialize.SyncDB()
}

func main() {

	r := gin.Default()

	// initialize CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:4200"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization",
			"Cache-Control", "Refresh"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	server := r.Group("/server")
	{
		server.POST("/register", handler.Register)
		server.POST("/login", handler.Login)
		server.GET("/account", handler.Account)
		server.POST("/account/refresh", handler.RefreshToken)
		server.POST("/recipes/add", handler.CreateRecipe())
		server.GET("/recipes/bypage", handler.RecipeGetByPage())
		server.PUT("recipes/edit/:id", handler.EditRecipe())
		server.DELETE("/recipes/delete/:id", handler.DeleteRecipe())
		server.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
		server.GET("/recipecount", handler.RecipeGetCount())
		server.POST("/meals/add", handler.CreateMeal())
		server.DELETE("/meals/delete/:id", handler.DeleteMeal())
	}

	r.Run("0.0.0.0:5000") //Listen and serve

}
