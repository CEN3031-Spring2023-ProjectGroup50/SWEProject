package models

type Rwimage struct {
	//gorm.Model
	Rid          uint `gorm:"primaryKey; column:rid"`
	Title        string
	Ingredients  string
	Instructions string
	Image_Name   string
	Uid          uint
	Image        []byte `gorm:"type:jsonb"`
}
