package models

import (
	"time"

	"gorm.io/gorm"
)

type Purchase struct {
	gorm.Model

	UserId          uint
	ShopItemId      *uint
	TransactionDate time.Time
	ShopItem        *ShopItem `gorm:"foreignKey:ShopItemId"`
}
