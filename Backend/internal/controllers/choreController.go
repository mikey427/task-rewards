package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
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
	var newChore models.Chore

	if errUser := c.ShouldBindBodyWith(&user, binding.JSON); errUser == nil {
		fmt.Println("User binded from body")
	} else if errNewChore := c.ShouldBindBodyWith(&newChore, binding.JSON); errNewChore == nil {
		fmt.Println("newChore binded from body")
	}

}

func RetrieveAllChores(c *gin.Context) {
	var user User
	if err := c.ShouldBindUri(&user); err != nil {
		c.JSON(400, gin.H{"message": err.Error()})
	}

	var chores []models.Chore
	if result := database.DB.Where("id= ?", user.ID).Find(&chores); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error retrieving chores",
		})

		return
	}

	c.JSON(200, gin.H{
		"chores": chores,
	})

}
