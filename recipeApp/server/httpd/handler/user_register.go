package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// @Summary register a user to the site
// @Accept json
// @Produce json
// @param body body userBody	true "user data"
// @Success 200
// @Failure 400
// @Router /server/register [post]
func Register(c *gin.Context) {

	body := userBody{}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	user := models.User{Email: body.Email, Password: string(hash)}
	result := initialize.Db.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return

	}

	c.JSON(http.StatusOK, gin.H{})
}
