package initialize

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InitDB() *gorm.DB {
	Db = ConnectDB()
	return Db
}

func ConnectDB() *gorm.DB {
	var err error
	//postgres://xysoqtcp:zgTjP22KwwT0H4aUuPO5jbNmAMziOxYl@fanny.db.elephantsql.com/xysoqtcp
	dsn := "host=fanny.db.elephantsql.com user=xysoqtcp password=zgTjP22KwwT0H4aUuPO5jbNmAMziOxYl dbname=xysoqtcp port=5432"
	Db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		fmt.Println("Error connecting to database")
	}
	return Db

}
