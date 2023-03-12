package models

type Recipe struct {
	//gorm.Model
	Rid          uint `gorm:"primaryKey; column:rid"`
	Title        string
	Ingredients  string
	Instructions string
	Image_Name   string
	Uid          uint
	Image        []byte `gorm:"type:bytea"`
}
