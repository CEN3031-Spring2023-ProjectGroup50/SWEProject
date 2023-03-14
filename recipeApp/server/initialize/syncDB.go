package initialize

import "recipeApp/models"

func SyncDB() {
	Db.AutoMigrate(&models.User{}, &models.Recipe{}, &models.Rwimage{})
}
