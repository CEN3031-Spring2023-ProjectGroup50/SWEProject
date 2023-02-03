package recipes

import (
	"recipeApp/models"
)

type Repo struct {
	Recipes []models.Recipe
}

func New() *Repo {
	return &Repo{
		Recipes: []models.Recipe{},
	}

}

func (r *Repo) Add(recipe models.Recipe) {
	r.Recipes = append(r.Recipes, recipe)
}

func (r *Repo) GetAll() []models.Recipe {
	return r.Recipes
}
