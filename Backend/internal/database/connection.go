package database

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitConnection() {
	dsn := os.Getenv("DB")
	fmt.Println(dsn)
	DB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	fmt.Println(DB)

	if err != nil {
		panic("Failed to connect to db")
	}
}
