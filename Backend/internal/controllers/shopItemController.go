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

func CreateShopItem(c *gin.Context) {
	var newShopItemReq models.CreateShopItemRequest

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
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
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
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

type ShopItem struct {
	ID uint `gorm:"primaryKey"`
}

func DeleteShopItem(c *gin.Context) {

	var shopItem ShopItem

	if err := c.ShouldBindUri(&shopItem); err != nil {
		c.JSON(200, gin.H{
			"error": err,
		})
		return
	}

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	if result := database.DB.Where("id = ? AND user_id = ?", shopItem.ID, user.ID).Delete(&shopItem); result.Error != nil {
		c.JSON(500, gin.H{"error": "Error deleting from DB"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Record deleted successfully",
	})
}

func UpdateShopItem(c *gin.Context) {

	var updatedShopItemBody models.UpdateShopItemRequest

	var updatedRecord models.ShopItem

	if err := c.ShouldBindJSON(&updatedShopItemBody); err != nil {
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

	updatedRecord.ID = updatedShopItemBody.ID
	updatedRecord.Title = updatedShopItemBody.Title
	updatedRecord.Description = updatedShopItemBody.Description
	updatedRecord.Cost = updatedShopItemBody.Cost

	ctx := context.Background()

	result, err := gorm.G[models.ShopItem](database.DB).Where("id = ? AND user_id = ?", updatedRecord.ID, user.ID).Updates(ctx, updatedRecord)
	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "Shop item updated successfully",
		"data":    result,
	})
}

func RedeemShopItem(c *gin.Context) {
	var shopItem models.ShopItemRedeemRequest

	if err := c.ShouldBindUri(&shopItem); err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	fmt.Println("Shop Item ID:", shopItem.ID)

	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	var shopItemRecord models.ShopItem

	ctx := context.Background()

	shopItemRecord, err = gorm.G[models.ShopItem](database.DB).Where("id = ?", shopItem.ID).First(ctx)
	if err != nil {
		c.JSON(404, gin.H{"error": "Shop item not found"})
		return
	}

	transactionRecord := models.Purchase{
		UserId:     user.ID,
		ShopItemId: &shopItemRecord.ID,
		ShopItem:   &shopItemRecord,
	}

	newShopItemRedemptionRecord := gorm.WithResult()
	err = gorm.G[models.Purchase](database.DB).Create(ctx, &transactionRecord)

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to redeem shop item"})
		return
	}

	user.Balance -= shopItemRecord.Cost
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update user balance"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Shop item redeemed successfully",
		"data":    newShopItemRedemptionRecord,
	})
}
