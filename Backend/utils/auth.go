package utils

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/mikey427/Backend/internal/models"
)

func GetUserFromContext(c *gin.Context) (*models.User, error) {
	temp, exists := c.Get("user")
	if !exists {
		return nil, fmt.Errorf("failed to retrieve user from Auth middleware")
	}

	user, ok := temp.(models.User)
	if !ok {
		return nil, fmt.Errorf("invalid user data from middleware")
	}

	return &user, nil

}
