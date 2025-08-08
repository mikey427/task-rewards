package models

import (
	"gorm.io/gorm"
)

type ChoreCompletion struct {
	gorm.Model

	UserId  uint
	ChoreId *uint
	Chore   *Chore `gorm:"foreignKey:ChoreId"`
}

type ChoreCompletionRequest struct {
	ID *uint
}
