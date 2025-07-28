package models

import "gorm.io/gorm"

type ShopItem struct {
	gorm.Model

	UserId      uint
	Title       string
	Description string
	Cost        int
	// MaxQuantity	int
}
