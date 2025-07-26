package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// get the email/pass of req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return

	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password from body",
		})

		return
	}

	// Create the user
	user := models.User{Email: body.Email, Password: string(hash)}

	result := database.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	// Respond

	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {

	// Get the email and password off req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return

	}

	// Look up requested user
	result := database.DB.Where("name = ?", "jinzhu").First(&user)

	// Compare sent in password with saved user pass hash

	// Generate a JWT token

	// Send it back

}
