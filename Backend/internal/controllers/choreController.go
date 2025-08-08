package controllers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
	"github.com/mikey427/Backend/utils"
	"gorm.io/gorm"
)

type User struct {
	ID string `uri:"id" binding:"required,uuid"`
}

type body struct {
	user      models.User
	choreData models.Chore
}

func CreateChore(c *gin.Context) {
	var newChore models.CreateChoreRequest

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	if err := c.ShouldBindJSON(&newChore); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(user)

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
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
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

type Chore struct {
	ID uint `gorm:"primaryKey"`
}

func DeleteChore(c *gin.Context) {
	var chore Chore

	if err := c.ShouldBindUri(&chore); err != nil {
		c.JSON(400, gin.H{
			"error": err,
		})
		return
	}

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	if result := database.DB.Where("id = ? AND user_id = ?", chore.ID, user.ID).Delete(&chore); result.Error != nil {
		c.JSON(500, gin.H{
			"error": "Error deleting from DB",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Record deleted successfully",
	})

}

func UpdateChore(c *gin.Context) {
	var updatedChoreBody models.UpdateChoreRequest

	var updatedRecord models.Chore

	if err := c.ShouldBindJSON(&updatedChoreBody); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	updatedRecord.ID = updatedChoreBody.ID
	updatedRecord.Title = updatedChoreBody.Title
	updatedRecord.Description = updatedChoreBody.Description
	updatedRecord.RewardAmount = updatedChoreBody.RewardAmount

	ctx := context.Background()

	result, err := gorm.G[models.Chore](database.DB).Where("id = ? AND user_id = ?", updatedRecord.ID, user.ID).Updates(ctx, updatedRecord)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Chore updated successfully",
		"data":    result,
	})
}

func CompleteChore(c *gin.Context) {
	var chore models.ChoreCompletionRequest

	if err := c.ShouldBindUri(&chore); err != nil {
		c.JSON(400, gin.H{
			"error": err,
		})
		return
	}
	fmt.Println("Chore ID:", chore.ID)
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	// Get the chore
	var choreRecord models.Chore

	ctx := context.Background()

	choreRecord, err = gorm.G[models.Chore](database.DB).Where("id = ?", chore.ID).First(ctx)
	if err != nil {
		c.JSON(404, gin.H{"error": "Chore not found"})
		return
	}
	// Create a new ChoreCompletion record

	choreCompletion := models.ChoreCompletion{
		UserId:  user.ID,
		ChoreId: &choreRecord.ID,
		Chore:   &choreRecord,
	}

	newChoreCompletionRecord := gorm.WithResult()
	err = gorm.G[models.ChoreCompletion](database.DB).Create(ctx, &choreCompletion)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to create chore completion record"})
		return
	}

	// Update the user's balance
	user.Balance += choreRecord.RewardAmount
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update user balance"})
		return
	}

	c.JSON(200, gin.H{
		"message":    "Chore completed successfully",
		"chore":      choreRecord,
		"balance":    user.Balance,
		"completion": newChoreCompletionRecord,
	})

}
