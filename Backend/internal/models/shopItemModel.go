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

type CreateShopItemRequest struct {
	UserId      uint
	Title       string
	Description string
	Cost        int
}

type UpdateShopItemRequest struct {
	ID          uint
	UserId      uint
	Title       string
	Description string
	Cost        int
}
