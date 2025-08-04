package models

import (
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type ChoreCompletion struct {
	gorm.Model

	UserId          uint
	ChoreId         *uint
	Chore           *Chore `gorm:"foreignKey:ChoreId"`
	TransactionDate datatypes.Date
}
