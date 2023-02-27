package handler

import (
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type userBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// @Summary allows a user to login
// @param body body userBody	true "user data"
// @Accept json
// @Produce json
// @Success 200
// @Failure 400
// @Router /server/login [post]
func Login(c *gin.Context) {

	body := userBody{}

	if c.Bind(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}
	var user models.User
	initialize.Db.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid email or password",
		})
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "login successful!",
		})

	}

}
