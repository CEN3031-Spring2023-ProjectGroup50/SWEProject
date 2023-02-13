package controllers

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"recipeApp/initialize"
	"recipeApp/models"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

const SECRET = "test21"

type JWTData struct {
	// Standard claims are the standard jwt claims from the IETF standard
	// https://tools.ietf.org/html/rfc7519
	jwt.StandardClaims
	CustomClaims map[string]string `json:"custom,omitempty"`
}

func CreateToken(c *gin.Context) {
	// create JWT token
	claims := JWTData{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour).Unix(),
		},

		CustomClaims: map[string]string{
			"userid": "u1",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(SECRET))
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Login failed",
		})
		return
	}

	json, err := json.Marshal(struct {
		Token string `json:"token"`
	}{
		tokenString,
	})

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Login failed",
		})
		return
	}

	c.Writer.Write(json)
}

func Register(c *gin.Context) {
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

	CreateToken(c)

	//c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {

	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

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
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid email or password",
		})
		return
	} else {
		CreateToken(c)
	}

}

func Account(c *gin.Context) {
	authToken := c.Request.Header.Get("Authorization")
	authArr := strings.Split(authToken, " ")

	if len(authArr) != 2 {
		log.Println("Authentication header is invalid: " + authToken)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Request failed",
		})
		return
	}

	jwtToken := authArr[1]

	claims, err := jwt.ParseWithClaims(jwtToken, &JWTData{}, func(token *jwt.Token) (interface{}, error) {
		if jwt.SigningMethodHS256 != token.Method {
			return nil, errors.New("Invalid signing algorithm")
		}
		return []byte(SECRET), nil
	})

	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Request failed",
		})
		return
	}

	data := claims.Claims.(*JWTData)

	userID := data.CustomClaims["userid"]

	// get data from userID and convert to JSON
	jsonData, err := getAccountData(userID)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Request failed",
		})
		return
	}

	c.Writer.Write(jsonData)
}

func getAccountData(userID string) ([]byte, error) {
	output := userID
	json, err := json.Marshal(output)
	if err != nil {
		return nil, err
	}

	return json, nil
}
