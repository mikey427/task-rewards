package models

import (
	"gorm.io/gorm"
)

type Purchase struct {
	gorm.Model

	UserId     uint
	ShopItemId *uint
	ShopItem   *ShopItem `gorm:"foreignKey:ShopItemId"`
}
