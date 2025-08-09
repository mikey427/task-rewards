package controllers

import (
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
	"github.com/mikey427/Backend/utils"
)

type HistoryItem struct {
	ID        uint      `json:"id"`
	Type      string    `json:"type"` // "chore" or "purchase"
	Name      string    `json:"name"`
	Amount    int       `json:"amount"`
	Timestamp time.Time `json:"timestamp"`
}

func RetrieveHistory(c *gin.Context) {
	user, err := utils.GetUserFromContext(c)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve user from Auth middleware"})
		return
	}

	var choresCompletions []models.ChoreCompletion
	if result := database.DB.Where("user_id = ?", user.ID).Preload("Chore").Find(&choresCompletions); result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve chores completions"})
		return
	}

	var shopItemPurchases []models.Purchase
	if result := database.DB.Where("user_id = ?", user.ID).Preload("ShopItem").Find(&shopItemPurchases); result.Error != nil {
		c.JSON(500, gin.H{"error": "Failed to retrieve shop item purchases"})
		return
	}

	var ChoreHistory []HistoryItem
	for _, choreCompletion := range choresCompletions {
		ChoreHistory = append(ChoreHistory, HistoryItem{
			ID:        choreCompletion.ID,
			Type:      "chore",
			Name:      choreCompletion.Chore.Title,
			Amount:    choreCompletion.Chore.RewardAmount,
			Timestamp: choreCompletion.CreatedAt,
		})
	}

	var ShopItemHistory []HistoryItem
	for _, purchase := range shopItemPurchases {
		ShopItemHistory = append(ShopItemHistory, HistoryItem{
			ID:        purchase.ID,
			Type:      "purchase",
			Name:      purchase.ShopItem.Title,
			Amount:    purchase.ShopItem.Cost,
			Timestamp: purchase.CreatedAt,
		})
	}

	userTransactionHistory := append(ChoreHistory, ShopItemHistory...)
	sort.Slice(userTransactionHistory, func(i, j int) bool {
		return userTransactionHistory[i].Timestamp.After(userTransactionHistory[j].Timestamp)
	})

	c.JSON(200, gin.H{
		"history": userTransactionHistory,
	})

}
