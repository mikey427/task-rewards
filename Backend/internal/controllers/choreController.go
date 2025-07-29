package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
)

type User struct {
	ID string `uri:"id" binding:"required,uuid"`
}

type body struct {
	user      models.User
	choreData models.Chore
}

func CreateChore(c *gin.Context) {
	var user models.User
	var newChore models.CreateChoreRequest

	temp, exists := c.Get("user")
	if !exists {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth Context on backend"})
		return
	}
	user, ok := temp.(models.User)
	if !ok {
		c.JSON(500, gin.H{"error": "Invalid user data in context"})
		return
	}

	if err := c.ShouldBindJSON(&newChore); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	chore := models.Chore{
		UserId:       user.ID,
		Title:        newChore.Title,
		Description:  newChore.Description,
		RewardAmount: newChore.RewardAmount,
	}
	result := database.DB.Create(&chore)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create chore"})
		return
	}

	c.JSON(201, gin.H{
		"message": "New chore created successfully",
		"chore":   chore,
	})

}

func RetrieveAllChores(c *gin.Context) {
	// var user User
	// if err := c.ShouldBindUri(&user); err != nil {
	// 	c.JSON(400, gin.H{"message": err.Error()})
	// }
	temp, exists := c.Get("user")
	if !exists {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth Context on backend"})
		return
	}
	user, ok := temp.(models.User)
	if !ok {
		c.JSON(500, gin.H{"error": "Invalid user data in context"})
		return
	}

	var chores []models.Chore
	if result := database.DB.Where("user_id= ?", user.ID).Find(&chores); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error retrieving chores",
		})

		return
	}

	c.JSON(200, gin.H{
		"chores": chores,
	})

}
