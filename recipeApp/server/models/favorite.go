package models

type Favorite struct {
	//gorm.Model
	Fid      uint `gorm:"primaryKey; column:fid"`
	Userid   uint
	Recipeid uint
}
