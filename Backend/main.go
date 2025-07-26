package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/config"
	"github.com/mikey427/Backend/internal/controllers"
	"github.com/mikey427/Backend/internal/database"
)

func init() {
	config.LoadEnvVariables()
	database.InitConnection()
	// database.SyncDatabase()
}

func main() {
	fmt.Println("Hello")
	router := gin.Default()
	router.POST("/signup", controllers.Signup)
	router.Run() // listen and serve on 0.0.0.0:8080
}
