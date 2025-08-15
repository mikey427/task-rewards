package main

import (
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

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	// Auth routes
	router.POST("/api/auth/signup", controllers.Signup)
	router.POST("/api/auth/login", controllers.Login)
	router.GET("/api/auth/validate", middleware.RequireAuth, controllers.Validate)

	// User routes
	router.GET("/api/chores", middleware.RequireAuth, controllers.RetrieveAllChores)
	router.POST("/api/create-chore", middleware.RequireAuth, controllers.CreateChore)
	router.DELETE("/api/delete-chore/:ID", middleware.RequireAuth, controllers.DeleteChore)
	router.PUT("/api/update-chore", middleware.RequireAuth, controllers.UpdateChore)
	router.POST("/api/complete-chore/:ID", middleware.RequireAuth, controllers.CompleteChore)

	// User Settings
	router.POST("/api/user/settings", middleware.RequireAuth, controllers.UpdateUserSettings)

	// Shop routes
	router.GET("/api/shop", middleware.RequireAuth, controllers.RetrieveShop)
	router.POST("/api/create-shop-item", middleware.RequireAuth, controllers.CreateShopItem)
	router.DELETE("/api/delete-shop-item/:ID", middleware.RequireAuth, controllers.DeleteShopItem)
	router.PUT("/api/update-shop-item", middleware.RequireAuth, controllers.UpdateShopItem)
	router.POST("/api/redeem-shop-item/:ID", middleware.RequireAuth, controllers.RedeemShopItem)

	// Transaction routes
	router.GET("/api/history", middleware.RequireAuth, controllers.RetrieveHistory)
	router.Run() // listen and serve on 0.0.0.0:3000
}
