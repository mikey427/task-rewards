package database

import (
	"fmt"
	"log"

	"github.com/mikey427/Backend/internal/models"
)

func SyncDatabase() {
	err := DB.AutoMigrate(&models.User{}, &models.Chore{}, &models.ShopItem{}, &models.Transaction{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	fmt.Println("Database migrated successfully!")
}
