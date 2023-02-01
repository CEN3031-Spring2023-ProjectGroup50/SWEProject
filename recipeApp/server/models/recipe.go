package models

import (
	"gorm.io/gorm"
)

type Recipe struct {
	gorm.Model
	ID           uint
	Title        string
	Ingredients  []string
	Instructions []string
	ImgLink      string

	//FINISH
}
