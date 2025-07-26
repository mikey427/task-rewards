package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/config"
	"github.com/mikey427/Backend/internal/database"
)

func init() {
	config.LoadEnvVariables()
	database.InitConnection()
	database.SyncDatabase()
}

func main() {
	fmt.Println("Hello")
	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run() // listen and serve on 0.0.0.0:8080
}
