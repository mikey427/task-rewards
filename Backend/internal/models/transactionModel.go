package models

import (
	"gorm.io/datatypes"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model

	UserId          uint
	TransactionDate datatypes.Date
	// Chore           Chore `gorm:"foreignKey:UserId"`
	// TransactionType (Chore completion || Shop Purchase)
	// Chore or Shop Item
}
