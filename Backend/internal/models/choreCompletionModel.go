package models

import (
	"gorm.io/gorm"
)

type ChoreCompletion struct {
	gorm.Model

	UserId  uint
	ChoreId *uint
	Chore   *Chore `gorm:"foreignKey:ChoreId"`

	ChoreTitle       string
	ChoreDescription string
	ChoreReward      int
}

type ChoreCompletionRequest struct {
	ID *uint
}
