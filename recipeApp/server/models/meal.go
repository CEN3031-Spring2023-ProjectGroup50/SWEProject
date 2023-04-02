package models

type Meal struct {
	//gorm.Model
	Mid      uint `gorm:"primaryKey; column:mid"`
	Userid   uint
	Recipeid uint
	Date     string `gorm:"column:date"`
	Mealtype string `gorm:"column:mealtype"`
	User     User   `gorm:"foreignKey:Userid"`
	Recipe   Recipe `gorm:"foreignKey:Recipeid"`
}
