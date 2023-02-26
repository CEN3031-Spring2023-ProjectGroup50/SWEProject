# Sprint 2
2/8/2023 - 2/22/2023

## Work completed in sprint 2

### User Stories
[insert here]

### Tasks
[insert here]

## Frontend

### Unit tests
[insert here]

### Cypress tests
[insert here]

## Backend

### Unit tests
Backend unit tests are located in main_test.go

|Function                   | Test Description                                          |
| :---                      |  :---                                                     |
| TestRecipesRoute          | Return status OK (Retrieve all Recipes)                   |
| TestRecipesRoute          | Recipe list is not empty                                  |
| TestRecipesRoute          | Number of recipes returned > 13000                        |
| TestRecipeGetByID         | Return status OK (Single recipe returned)                 |
| TestRecipeGetByID         | Recipe Id matches the requested recipe                    |
| TestRecipeGetByKeyword    | Return status OK (Retrieved recipes with keyword)         |
| TestRecipeGetByKeyword    | Did not return empty set                                  |
| TestRecipeGetByKeyword    | All recipes returned contain keyword                      |
| TestRecipeGetByIngredient | Return status OK (Retrieved recipes with ingredient)      |
| TestRecipeGetByIngredient | Did not return empty set                                  |
| TestRecipeGetByIngredient | All recipes returned have desired ingredient              |
| TestRecipeGetByPage       | Return status OK (Recipes returned)                       |
| TestRecipeGetByPage       | Amount of recipes returned is correct                     |
| TestRecipeGetByPage       | The expected last element matches the rID in sorted order |
| TestRecipePost            | Able to post desired recipe body                          |
| TestRecipePost            | Not able to post non-unique recipe                        |
| TestRecipeDelete          | Able to delete recipes added in TestRecipePost            |
| TestRecipeDelete          | Able to delete a non-existent recipe (Idempotent)         |

## API documentation
[insert here; need to ask if we can link out to another page so that we can capture API documentation outside of sprint summaries.]
