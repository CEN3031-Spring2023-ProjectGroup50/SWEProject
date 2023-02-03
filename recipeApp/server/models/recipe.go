package models

type Recipe struct {
	//gorm.Model
	Rid                 uint `gorm:"primaryKey; column:rID"`
	Title               string
	Ingredients         string
	Instructions        string
	Image_Name          string
	Cleaned_Ingredients string
}
