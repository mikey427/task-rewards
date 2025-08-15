package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/mikey427/Backend/internal/database"
	"github.com/mikey427/Backend/internal/models"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	// get the email/pass of req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return

	}

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password from body",
		})

		return
	}

	userSettings := models.UserSettings{
		Theme:                        "light",
		Language:                     "en",
		DebtEnabled:                  true,
		DebtMax:                      0, // 0 == default limit
		InterestEnabled:              true,
		InterestPercent:              0, // 0 == default debt interest rate
		DisplayBankruptcy:            true,
		DeleteChoresOnCompletion:     false,
		DeleteShopItemsOnCompletion:  false,
		LevelingEnabled:              true,
		LevelDecayEnabled:            false,
		LevelDecayPerDay:             0,
		CurrencyName:                 "minutes",
		BankruptcyEnabled:            true,
		BankruptcyCooldownDays:       0, // 0 == default
		ProbationEnabled:             true,
		ProbationDurationDays:        0, // 0 == default
		ConfirmBeforePurchase:        true,
		ConfirmBeforeDebt:            true,
		ShowCompletionAnimations:     false,
		StreakNotifications:          false,
		WeeklyReports:                false,
		DefaultChoreReward:           30,
		DefaultShopItemCost:          30,
		StreakBonusMultiplierEnabled: true,
		AchievementEnabled:           true,
		LeaderboardEnabled:           true,
		AnalyticsEnabled:             false,
		FamilyEnabled:                false,
	}

	// Create the user
	user := models.User{Email: body.Email, Password: string(hash), Balance: 0, UserSettings: userSettings}

	result := database.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})

		return
	}

	// Respond

	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {

	// Get the email and password off req body
	var body struct {
		Email    string
		Password string
	}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return

	}

	// Look up requested user
	var user models.User
	database.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})

		return
	}

	// Compare sent in password with saved user pass hash
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})

		return
	}

	// Generate a JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create token",
		})

		return
	}

	// Send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true) // Prod TODO: Update these for security

	c.JSON(http.StatusOK, user)

}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, user)
}

func UpdateUserSettings(c *gin.Context) {
	var body struct {
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

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})

		return
	}

	// Update user settings
	user := c.MustGet("user").(models.User)
	user.UserSettings = models.UserSettings{
		Theme:                        body.Theme,
		Language:                     body.Language,
		DebtEnabled:                  body.DebtEnabled,
		DebtMax:                      body.DebtMax,
		InterestEnabled:              body.InterestEnabled,
		InterestPercent:              body.InterestPercent,
		DisplayBankruptcy:            body.DisplayBankruptcy,
		DeleteChoresOnCompletion:     body.DeleteChoresOnCompletion,
		DeleteShopItemsOnCompletion:  body.DeleteShopItemsOnCompletion,
		LevelingEnabled:              body.LevelingEnabled,
		LevelDecayEnabled:            body.LevelDecayEnabled,
		LevelDecayPerDay:             body.LevelDecayPerDay,
		CurrencyName:                 body.CurrencyName,
		BankruptcyEnabled:            body.BankruptcyEnabled,
		BankruptcyCooldownDays:       body.BankruptcyCooldownDays,
		ProbationEnabled:             body.ProbationEnabled,
		ProbationDurationDays:        body.ProbationDurationDays,
		ConfirmBeforePurchase:        body.ConfirmBeforePurchase,
		ConfirmBeforeDebt:            body.ConfirmBeforeDebt,
		ShowCompletionAnimations:     body.ShowCompletionAnimations,
		StreakNotifications:          body.StreakNotifications,
		WeeklyReports:                body.WeeklyReports,
		DefaultChoreReward:           body.DefaultChoreReward,
		DefaultShopItemCost:          body.DefaultShopItemCost,
		StreakBonusMultiplierEnabled: body.StreakBonusMultiplierEnabled,
		AchievementEnabled:           body.AchievementEnabled,
		LeaderboardEnabled:           body.LeaderboardEnabled,
		AnalyticsEnabled:             body.AnalyticsEnabled,
		FamilyEnabled:                body.FamilyEnabled,
	}

	if result := database.DB.Save(&user); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update user settings",
		})

		return
	}

	c.JSON(http.StatusOK, user)
}
