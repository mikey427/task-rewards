package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
)

func CreateShopItem(c *gin.Context) {
	var user models.User
	var newShopItemReq models.CreateShopItemRequest

	temp, exists := c.Get("user")
	if !exists {
		c.JSON(500, gin.H{"Error": "Failed to retrieve user from Auth middleware"})
		return
	}

	user, ok := temp.(models.User)
	if !ok {
		c.JSON(500, gin.H{"error": "invalid user data from middleware"})
		return
	}

	if err := c.ShouldBindJSON(&newShopItemReq); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	shopItem := models.ShopItem{
		UserId:      user.ID,
		Title:       newShopItemReq.Title,
		Description: newShopItemReq.Description,
		Cost:        newShopItemReq.Cost,
	}

	result := database.DB.Create(&shopItem)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to create shop item"})
		return
	}

	c.JSON(201, gin.H{
		"message":  "New shop item created successfully",
		"shopItem": shopItem,
	})
}

func RetrieveShop(c *gin.Context) {
	temp, exists := c.Get("user")
	if !exists {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	user, ok := temp.(models.User)
	if !ok {
		c.JSON(500, gin.H{
			"error": "Invalid user data from middleware",
		})
		return
	}

	var shopItems []models.ShopItem
	if result := database.DB.Where("user_id= ?", user.ID).Find(&shopItems); result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Error retrieving shop items",
		})
		return
	}

	c.JSON(200, gin.H{
		"shopItems": shopItems,
	})
}
