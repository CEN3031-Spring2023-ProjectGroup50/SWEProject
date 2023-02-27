package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strings"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
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
