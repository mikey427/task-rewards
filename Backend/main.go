package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/config"
	"github.com/mikey427/Backend/internal/controllers"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/middleware"
)

func init() {
	config.LoadEnvVariables()
	database.InitConnection()
	database.SyncDatabase()
}

func main() {
	fmt.Println("Hello")
	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // Your React dev server
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/api/signup", controllers.Signup)
	router.POST("/api/login", controllers.Login)
	router.GET("/api/validate", middleware.RequireAuth, controllers.Validate)
	router.GET("/api/chores", middleware.RequireAuth, controllers.RetrieveAllChores)
	router.POST("/api/create-chore", middleware.RequireAuth, controllers.CreateChore)
	router.GET("/api/shop", middleware.RequireAuth, controllers.RetrieveShop)
	router.POST("/api/create-shop-item", middleware.RequireAuth, controllers.CreateShopItem)

	router.Run() // listen and serve on 0.0.0.0:8080
}
