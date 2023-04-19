# Mallow
by the SWErve Team

## Project Status 
This project is currently in the *design* phase.

## Project Description
**Mallow** is a meal planning, recipe, and grocery app designed to help you take control of your food routine. Deciding what to eat can be frustrating. Finding the right recipe once you have an idea can be even worse. And forgetting an ingredient at the grocery store... you get the picture. Mallow is a one-stop shop to help you meal plan for the week, save recipes for later, determine what you can make with groceries you already have, and list what groceries you need.

It has a comprehensive suite of features you're bound to love.
* Stop scrambling to decide what to cook each night - Plan your meals for the week in advance with calendar scheduling features, and discover ideas from a vast database of recipes!
* Stop letting food go to waste - search for recipes that use the ingredients already in your pantry. Plus, filter by allergens, dietary restrictions, and more.
* No more losing those recipes you love - Save them for later and find them easily in the app!
* Stop buying groceries that you don't need and forgetting what you do need - Mallow will help you form a complete and comprehensive grocery list from recipes you have scheduled!

Save time, and savor every meal with **Mallow**.

For more details of the "North Star" vision of this app and its user stories, see the [specification](docs/RecipeAppRequirementSpec.md#feature-summary-and-user-stories).

## Setup & Installation
REQUIREMENTS: You must have the following installed prior to following these steps:
- [Go](https://go.dev/dl/)
- [Node.js (LTS)](https://nodejs.org/en/download) 
- make (or MinGW)

### Unlocking secured files
This step is **IMPORTANT**. Some of the files in this repo are encrypted using git-crypt; you must unlock them before proceeding.
1. In the `/SWEProject` root folder:<br>
   - Add the file `git-crypt-key`
   - Add `git-crypt-key` to the .gitignore file
   - Run `git-crypt unlock git-crypt-key`
    
### Installing dependencies
2. In the `/SWEProject/recipeApp/server/` folder:<br>
   - Run `make install` or `mingw32-make install` to install all Go dependencies
   - Run `go mod tidy`
3. In the `/SWEProject/recipeApp/client/` folder:<br>
   - Run `make install` or `mingw32-make install` to install all Angular dependencies
   - If this is not successful, run `npm install --force`

## Starting Mallow
1. Open a new terminal
2. In the `/SWEProject/recipeApp/server/` folder:<br>
   - Run `make dev` or `mingw32-make dev` to start the backend server
   - If this is not successful, run `go run main.go`
3. Open a 2nd terminal (do NOT close the first one)
4. In the `/SWEProject/recipeApp/client/` folder:<br>
   - Run `make dev` or `mingw32-make dev` to build the Angular frontend
   - If this is not successful, run `npm run start`
 To stop running, press Ctrl+C in both terminals to exit.

## Testing the application

### Backend unit tests
1. Open a new terminal
2. Navigate to the `/SWEProject/recipeApp/server/` folder
3. Run `go test`

### Frontend unit tests (Karma/Jasmine)
1. Open a new terminal
2. Navigate to the `/SWEProject/recipeApp/client/` folder
3. Run `npm test`

### Frontend E2E tests (Cypress)
1. Open a new terminal
2. Navigate to the `/SWEProject/recipeApp/client/` folder
3. Run `npx cypress open`
4. Click on E2E testing and select your preferred browser

## Team Members

Backend       | Frontend
------------- | -------------
Seth Paul (sethyboy20)  | Shannon Hicks (shanhix1-personal)
Wes Ahearn (wejama)  | Emily Anderson (Em-Anderson)
