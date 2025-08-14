package models

import "gorm.io/gorm"

// TODO: Change these column names to be lower case to match front end convention
type User struct {
	gorm.Model
	Name         string
	Email        string `gorm:"unique"`
	Password     string
	Balance      int
	UserSettings UserSettings
}

type UserSettings struct {
	UserId                       uint
	Theme                        string
	Language                     string
	DebtEnabled                  bool
	DebtMax                      int
	InterestEnabled              bool
	InterestPercent              float64
	DisplayBankruptcy            bool
	DeleteChoresOnCompletion     bool
	DeleteShopItemsOnCompletion  bool
	LevelingEnabled              bool
	LevelDecayEnabled            bool
	LevelDecayPerDay             int
	CurrencyName                 string
	BankruptcyEnabled            bool
	BankruptcyCooldownDays       int
	ProbationEnabled             bool
	ProbationDurationDays        int
	ConfirmBeforePurchase        bool
	ConfirmBeforeDebt            bool
	ShowCompletionAnimations     bool
	StreakNotifications          bool
	WeeklyReports                bool
	DefaultChoreReward           int
	DefaultShopItemCost          int
	StreakBonusMultiplierEnabled bool
	AchievementEnabled           bool
	LeaderboardEnabled           bool
	AnalyticsEnabled             bool
	FamilyEnabled                bool
}
