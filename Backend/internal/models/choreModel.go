package models

import "gorm.io/gorm"

type Chore struct {
	gorm.Model
	// Name     string
	// Email    string `gorm:"unique"`
	// Password string

	UserId       uint
	Title        string
	Description  string
	RewardAmount int
}

type CreateChoreRequest struct {
	UserId       uint
	Title        string
	Description  string
	RewardAmount int
}

type UpdateChoreRequest struct {
	ID           uint
	Title        string
	Description  string
	RewardAmount int
}
