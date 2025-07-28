package models

import "gorm.io/gorm"

// TODO: Change these column names to be lower case to match front end convention
type User struct {
	gorm.Model
	Name     string
	Email    string `gorm:"unique"`
	Password string
}
