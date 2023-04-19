# Sprint 4
3/28/2023 - 4/19/2023 (3 weeks)

| Contents of this document:
| :---
| [Demo video recordings](#links-to-sprint-4-video-recordings)
| [Work completed in sprint 4](#work-completed-in-sprint-4)
| [Frontend Unit tests](#frontend-unit-tests)
| [Backend Unit tests](#backend-unit-tests)
| [API documentation](#api-documentation)
| [Swagger tool for viewing APIs](#swagger)

## Links to sprint 4 video recordings

* [Sprint 4 Overview](https://drive.google.com/file/d/1rdelusH1KU6pYqGtCDgTQu3mNBuaJsEA/view?usp=sharing) (~26 minutes)
   *  0:00 - Intro
   *  1:30 - Backend new functionality: Image Upload, Meals, Favorites
   *  8:35 - Backend unit test overview
   *  20:48 - Backend unit test results
   *  22:05 - Frontend new functionality: Recipe image upload, Snackbars, Favorites, Meal Plan, Grocery List
   *  27:05 - Frontend cypress E2E tests and Karma unit tests

* [Overall Application Overview](https://drive.google.com/file/d/1onGFcXW0HyZ0RC94HAaIB9h1i7f4rMBs/view?usp=sharing) (~16 minutes)

* [Overall API Overview](https://drive.google.com/file/d/1K5uyUWG65D_ZwzaT2kiTKY5l1bbYLY2i/view?usp=share_link) (~20 minutes)

## Work completed in sprint 4

See the [Sprint 4 Taskboard](https://github.com/orgs/CEN3031-Spring2023-ProjectGroup50/projects/9) for a kanban style view of work planned and accomplished.

### User stories planned for Sprint 4

At the end of Sprint 3, users could almost completely manage recipes in the application. They were able to view all recipes, click to view more details, 
search and filter using various criteria, add/edit recipes, and navigate easily throughout the UI. Next we needed to incorporate deletion of recipes 
and focus on the other primary purposes of our application: meal planning and grocery list generation. 

As a group, we reviewed the incomplete user stories from Sprint 3 as well as the backlog of user stories, and defined the goal for Sprint 4. 
Because our time was limited with this being the last sprint of the semester, our primary goal was to establish a minimal viable product (MVP) for an end-to-end application. 
With any remaining time, we hoped to enhance different elements of the app with nice-to-have features which may not be necessary for baseline functionality. 
We came up with the following plan.

MVP
1. [7] As a user, I can delete previously created recipes so that I can keep my list up to date. #45
2. [12] As a user, I can add a recipe from the list to my meal plan so I can set up my schedule for the week.#48
3. [13] As a user, I can view the current week's planned recipes in a list so I know what I will be cooking.#49
4. [14] As a user, I can navigate between each week’s meal plan views so I can look forward in time.#30
5. [15] As a user, I can click to generate a static list of groceries based on recipes in the schedule for specified days or weeks up to 1 month, so I know what I need from the grocery store.#31
6. [8] As a user, I would like to be able to save recipes so I can easily find and access them later. #46

Nice-to-have
1. [18] As a user, I receive errors that help guide me so I know what to do next#65
2. [19] As a user, I want to upload a picture to accompany my recipe. 
3. [10] As a user, I would like to search the recipe list based on meal type so I can more easily find what I am looking for. #27
4. [9] As a user, I would like to search the recipe list based on type of cuisine so I can more easily find what I am looking for.

### Tasks completed for Sprint 4

1. [Insert here]

## Frontend Unit tests
Frontend Angular unit tests are located in files ending in `.spec.ts`. Each component and service has its own unit test file.

![Part1](https://user-images.githubusercontent.com/93093369/232954280-46060d87-f0c4-405f-b2c7-8f6e6d8fd750.png)
![Part2](https://user-images.githubusercontent.com/93093369/232954293-16957ce2-0005-4bb2-b8d6-617574bf50ea.png)
![Part3](https://user-images.githubusercontent.com/93093369/232954303-4d79bb7c-c3e7-4d11-9194-5e85f8e107f1.png)

### Cypress end-to-end (E2E) tests
Frontend Cypress end-to-end tests are located in files ending in `.cy.ts`. Each feature of Mallow has a Cypress file, including
1. Login/Logout Feature
2. Recipes View (including add, edit, and delete)
3. Meal Plan View
4. Grocery List View

![Cypress1](https://user-images.githubusercontent.com/93093369/232954470-f6ab35a2-8b30-4f7c-a9fb-9451de673e6a.png)

![Cypress2](https://user-images.githubusercontent.com/93093369/232954477-44505036-a5cd-4e36-ae4f-a630a0944e9d.png)

![Cypress3](https://user-images.githubusercontent.com/93093369/232954481-621ff967-08d2-4bbe-b226-1cd167c44d48.png)

![Cypress4](https://user-images.githubusercontent.com/93093369/232954489-c0bc7df5-cfda-46c9-95d7-97a2925b4e44.png)

**Assertions for Cypress E2E Tests can be seen in the video presentation for Sprint 4.


## Backend Unit tests
Backend unit tests are located in main_test.go

|Function                               | Test Description                                          
| :---                                  |  :---                                                             
| TestRecipeGetByKeyword                | Return status OK (Retrieved recipes with keyword) 
| TestRecipeGetByKeyword                | Check that result is empty if it should be  
| TestRecipeGetByKeyword                | Check that result is not empty if it should contain recipes
| TestRecipeGetByKeyword                | Check that all returned results contain the keyword
| TestRecipeGetByKeywordCount           | Return status OK (Retrieved count of recipes) 
| TestRecipeGetByKeywordCount           | Returned the expected number of results for given keyword
| TestRecipeGetByIngredient             | Return status OK (Retrieved recipes with ingredient) 
| TestRecipeGetByIngredient             | Check that result is empty if it should be  
| TestRecipeGetByIngredient             | Check that result is not empty if it should contain recipes
| TestRecipeGetByIngredient             | Check that all returned results contain the ingredient
| TestRecipeGetByIngredientCount        | Return status OK (Retrieved count of recipes)
| TestRecipeGetByIngredientCount        | Returned the expected number of results for given ingredient         
| TestRecipeGetByPage                   | Return status OK (Recipes returned)                       
| TestRecipeGetByPage                   | Amount of recipes returned is correct                     
| TestRecipeGetByPage                   | The expected last element matches the rID in sorted order 
| TestRecipePost                        | Return status OK (Able to post recipe)                        
| TestRecipePost                        | Response recipe ID is the same as supplied
| TestRecipePost                        | Response title is the same as supplied                        
| TestRecipePost                        | Response instructions are the same as supplied 
| TestRecipePost                        | Response ingredient is the same as supplied  
| TestRecipePost                        | Response image name is the same as supplied 
| TestRecipePost                        | Response user ID is the same as supplied 
| TestRecipeEdit                        | Return status OK (Able to edit recipe)                         
| TestRecipeEdit                        | Response recipe ID is the same as supplied
| TestRecipeEdit                        | Response title is the same as supplied                        
| TestRecipeEdit                        | Response instructions are the same as supplied 
| TestRecipeEdit                        | Response ingredient is the same as supplied  
| TestRecipeEdit                        | Response image name is the same as supplied 
| TestRecipeEdit                        | Response user ID is the same as supplied 
| TestRecipeEdit                        | Return bad request for a recipe ID that does not exist
| TestRecipeDelete                      | Able to delete recipes added in TestRecipePost            
| TestRecipeDelete                      | Return bad request for a recipe ID that does not exist
| TestCreateMeal                        | Return status OK (Able to create meal)
| TestCreateMeal                        | Response mealtype is the same as supplied
| TestCreateMeal                        | Response user ID is the same as supplied
| TestCreateMeal                        | Response recipe ID is the same as supplied
| TestCreateMeal                        | Response date is the same as supplied
| TestCreateMeal                        | Return bad request for meal with invalid user ID
| TestCreateMeal                        | Return bad request for meal with invalid recipe ID
| TestCreateMeal                        | Return bad request for meal with invalid mealtype
| TestmealGetByDate                     | Return status OK (Retrieved meals in date range)
| TestMealGetByDate                     | Check that all items are in date range
| TestMealGetByDate                     | Check that the number of items expected is returned
| TestEditMeal                          | Check that meal type was set to expected value   
| TestEditMeal                          | Check that meal date was set to expected value
| TestEditMeal                          | Return status OK (Able to edit meal)   
| TestDeleteMeal                        | Return status OK (Deleted meal)      
| TestDeleteMeal                        | Return bad request for a meal ID that does not exist
| TestFavoritesGetByKeyword             | Return status OK (Retrieved favorites with keyword)
| TestFavoritesGetByKeyword             | Check that all results have the keyword
| TestFavoritesGetByKeyword             | Check that result is empty if it should be
| TestFavoritesGetByIngredient          | Return status OK (Retrieved favorites with ingredient)
| TestFavoritesGetByIngredient          | Check that all results contain the ingredient
| TestFavoritesGetByIngredient          | Check that the result is empty if it should be
| TestFavoriteGetByPage                 | Return status OK (Recipes returned)                       
| TestFavoriteGetByPage                 | Amount of recipes returned is correct                     
| TestCreateFavorite                    | Return status OK (Able to create favorite)
| TestCreateFavorite                    | Check that user ID is the same as supplied
| TestCreateFavorite                    | Check that the recipe ID is the same as supplied
| TestCreateFavorite                    | Return bad request for meal with invalid recipe ID
| TestCreateFavorite                    | Return bad request for meal with invalid user ID
| TestCreateFavorite                    | Return bad request for meal with meal ID that already exists
| TestDeleteFavorite                    | Return status OK (able to delete recipe)
| TestDeleteFavorite                    | Return bad request for a favorite that does not exist
| TestLogin                             | Test valid user login returns status OK                   
| TestLogin                             | Test valid user login returns access token
| TestLogin                             | Test valid user login returns refresh token    
| TestLogin                             | Test invalid user login returns status 400     
| TestLogin                             | Test invalid user login returns no access token
| TestLogin                             | Test invalid user login returns no refresh token
| TestRegister                          | Test existing user cannot be registered 
| TestRegister                          | Test existing user returns no access token   
| TestRegister                          | Test existing user returns no refresh token   
| TestRegister                          | Test new user register returns status OK   
| TestRegister                          | Test new user register returns access token
| TestRegister                          | Test new user register returns refresh token
| TestAccountAuth                       | Auth fails with invalid key
| TestAccountAuth                       | No user ID returned with invalid key
| TestAccountAuth                       | Authentication fails with expired token
| TestAccountAuth                       | No user ID returned with expired token
| TestAccountAuth                       | Auth passes with correct key
| TestAccountAuth                       | User ID returned with correct key
| TestRefresh                           | Auth fails with invalid key
| TestRefresh                           | No access token returned with failed auth
| TestRefresh                           | No refresh token returned with failed auth
| TestRefresh                           | Auth fails with expired time
| TestRefresh                           | No access token returned with expired time
| TestRefresh                           | No refresh token returned with expired time
| TestRefresh                           | Auth succeeds with correct key
| TestRefresh                           | Token returned with correct key
| TestRefresh                           | Refresh token returned with correct key
| TestRefresh                           | Checks that token is refreshed
| TestRefresh                           | Checks that refresh token is refreshed


## API documentation

### Using the Mallow Web API

### REST Operation Groups

| Operation Group | Description                             |
| :---            | :---                                    |
| Recipes         | Provides operations related to Recipes  |
| Users           | Provides operations related to Users    |

#### Users

##### Security
HMAC generated auth token

##### Operations

|               |                       |
| :---          | :---                  |
| Create        | Register a User       |
| Get           | Login a User          |

##### User - Create

> HTTP
> 
> POST http://localhost:5000/server/register

##### Request Body

|  Name         | Required    | Type      | Description           |
| :---          | :---        | :---      | :---                  |
| email         | True        | string    | Email address of user |
| password      | True        | string    | Password of user      |

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | User      | OK                      |
| 400 Bad Request | Error     | Failed to read body     |
| 400 Bad Request | Error     | Failed to hash password |
| 400 Bad Request | Error     | Failed to create user   |

##### Sample Request

> HTTP
>
> POST http://localhost:5000/server/register
>
> {
>   
>     "email" : test@me.com,
>   
>     "password" : dy%f99__gNg!88
>   
> }

##### User - Get

> HTTP
> 
> POST http://localhost:5000/server/login

##### Request Body

|  Name         | Required    | Type      | Description           |
| :---          | :---        | :---      | :---                  |
| email         | True        | string    | Email address of user |
| password      | True        | string    | Password of user      |

##### Responses

| Name            | Type      | Description               |
| :---            | :---      | :---                      |
| 200 OK          | User      | login successful!         |
| 400 Bad Request | Error     | Failed to read body       |
| 400 Bad Request | Error     | Invalid email or password |
| 400 Bad Request | Error     | Failed to create user     |

##### Sample Request

> HTTP
>
> POST http://localhost:5000/server/login
>
>
> {
>   
>     "email" : test@me.com,
>   
>     "password" : dy%f99__gNg!88
>   
> }

#### Recipes

##### Operations

|               |                                               |
| :---          | :---                                          |
| Create        | Create a Recipe                               |
| Delete        | Delete a Recipe                               |
| Get           | Retrieve information about Recipe(s)          |
| Get (Paginate)| Retrieve ordered, limited Recipes             |

##### Recipe - Create

> HTTP
> 
> POST http://localhost:5000/server/recipes/add

##### Request Body

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| rid                 | True        | uint      | Unique id of recipe   |
| title               | True        | string    | Title of recipe       |
| instructions        | True        | string    | Recipe instructions   |
| ingredients         | True        | string    | Recipe ingredients    |
| image_name          | True        | string    | Name of recipe image  |
| cleaned_ingredients | True        | string    | Ingredients sanitized |

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | Failed to create recipe |

##### Sample Request

> HTTP
>
> POST http://localhost:5000/server/recipes/add
>
> {
>   
>    "rid":13503",
>    
>    "title":"Test Recipe 1",
>    
>    "instructions":"stir gently",
>    
>    "ingredients":"paprika,pepper,serrano",
>    
>    "image_name":"test_image_1",
>    
>    "cleaned_ingredients":"na"
>   
> }

##### Recipe - Delete

> HTTP
> 
> DELETE http://localhost:5000/server/recipes/delete/{rid}

##### Request Body

Empty

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | Could not delete recipe |

##### Sample Request

> HTTP
>
> DELETE http://localhost:5000/server/recipes/delete/13503

##### Recipe - Get (Paginate)

> HTTP
> 
> GET http://localhost:5000/server/recipes/bypage

##### URI Parameters

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| page                | False       | string    | Starting page of data |
| per_page            | False       | string    | Results per page      |
| id                  | False       | string    | Unique id of recipe   |
| keyword             | False       | string    | Search keyword        |
| ingredient          | False       | string    | Search ingredient     |

##### Request Body

Empty

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | No recipes returned     |

##### Sample Request

The default request

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=1&per_page=10&uid=0


##### Sample Response

```
[
  {
    "Rid": 0,
    "Title": "Miso-Butter Roast Chicken With Acorn Squash Panzanella",
    "Ingredients": "['1 (3½–4-lb.) whole chicken', '2¾ tsp. kosher salt, divided, plus more', '2 small acorn squash (about 3 lb. total)', '2 Tbsp. finely chopped sage', '1 Tbsp. finely chopped rosemary', '6 Tbsp. unsalted butter, melted, plus 3 Tbsp. room temperature', '¼ tsp. ground allspice', 'Pinch of crushed red pepper flakes', 'Freshly ground black pepper', '⅓ loaf good-quality sturdy white bread, torn into 1\" pieces (about 2½ cups)', '2 medium apples (such as Gala or Pink Lady; about 14 oz. total), cored, cut into 1\" pieces', '2 Tbsp. extra-virgin olive oil', '½ small red onion, thinly sliced', '3 Tbsp. apple cider vinegar', '1 Tbsp. white miso', '¼ cup all-purpose flour', '2 Tbsp. unsalted butter, room temperature', '¼ cup dry white wine', '2 cups unsalted chicken broth', '2 tsp. white miso', 'Kosher salt, freshly ground pepper']",
    "Instructions": "Pat chicken dry with paper towels, season all over with 2 tsp. salt, and tie legs together with kitchen twine. Let sit at room temperature 1 hour.\nMeanwhile, halve squash and scoop out seeds. Run a vegetable peeler along ridges of squash halves to remove skin. Cut each half into ½\"-thick wedges; arrange on a rimmed baking sheet.\nCombine sage, rosemary, and 6 Tbsp. melted butter in a large bowl; pour half of mixture over squash on baking sheet. Sprinkle squash with allspice, red pepper flakes, and ½ tsp. salt and season with black pepper; toss to coat.\nAdd bread, apples, oil, and ¼ tsp. salt to remaining herb butter in bowl; season with black pepper and toss to combine. Set aside.\nPlace onion and vinegar in a small bowl; season with salt and toss to coat. Let sit, tossing occasionally, until ready to serve.\nPlace a rack in middle and lower third of oven; preheat to 425°F. Mix miso and 3 Tbsp. room-temperature butter in a small bowl until smooth. Pat chicken dry with paper towels, then rub or brush all over with miso butter. Place chicken in a large cast-iron skillet and roast on middle rack until an instant-read thermometer inserted into the thickest part of breast registers 155°F, 50–60 minutes. (Temperature will climb to 165°F while chicken rests.) Let chicken rest in skillet at least 5 minutes, then transfer to a plate; reserve skillet.\nMeanwhile, roast squash on lower rack until mostly tender, about 25 minutes. Remove from oven and scatter reserved bread mixture over, spreading into as even a layer as you can manage. Return to oven and roast until bread is golden brown and crisp and apples are tender, about 15 minutes. Remove from oven, drain pickled onions, and toss to combine. Transfer to a serving dish.\nUsing your fingers, mash flour and butter in a small bowl to combine.\nSet reserved skillet with chicken drippings over medium heat. You should have about ¼ cup, but a little over or under is all good. (If you have significantly more, drain off and set excess aside.) Add wine and cook, stirring often and scraping up any browned bits with a wooden spoon, until bits are loosened and wine is reduced by about half (you should be able to smell the wine), about 2 minutes. Add butter mixture; cook, stirring often, until a smooth paste forms, about 2 minutes. Add broth and any reserved drippings and cook, stirring constantly, until combined and thickened, 6–8 minutes. Remove from heat and stir in miso. Taste and season with salt and black pepper.\nServe chicken with gravy and squash panzanella alongside.",
    "Image_Name": "miso-butter-roast-chicken-acorn-squash-panzanella",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AA{...}RX//2Q=="
    },
    {...}, //Represents truncate results, 8 removed.
    "Rid": 9,
    "Title": "Spiced Lentil and Caramelized Onion Baked Eggs",
    "Ingredients": "['1 (14.5-ounce) can basic lentil soup, like Amy’s', '1 large onion, thinly sliced', '½ tsp. turmeric', '1 tsp. cumin', '¼ tsp. Aleppo pepper or ⅛ tsp. crushed red pepper flakes', '2 Tbsp. tomato paste', '3 large eggs', '2 Tbsp. ghee, unsalted butter, or olive oil', '½ tsp. whole cumin seeds', 'Olive oil', 'Kosher salt and freshly ground black pepper', 'Parsley, for finishing']",
    "Instructions": "Place an oven rack in the center of the oven, then preheat to 350°F.\nIn a medium, oven-safe pan, heat 1 Tbsp. olive oil over medium heat. Add 1 large, thinly sliced onion and ½ tsp. Kosher salt. Cook, stirring often, until golden brown, about 25 minutes.\nAdd ½ tsp. turmeric, 1 tsp. cumin, ¼ tsp. Aleppo pepper (or ⅛ tsp. crushed red pepper flakes), and 2 Tbsp. tomato paste. Cook and stir constantly until the onions are coated and the tomato paste has darkened slightly, about 2 minutes. Add ⅓ cup water; stir and scrape up all the browned bits on the bottom of the pan for 1 to 2 minutes, or until the liquid looks thickened and saucy. Add one 14-oz. can of lentil soup; cook, stirring to combine, 1 to 2 minutes. Turn off the heat and season with salt, pepper, and more Aleppo pepper or red pepper flakes to taste.\nUsing a spoon, create 3 wells in the lentil mixture. Carefully crack 1 egg into each well. Transfer the pan to the oven and bake until the whites of the eggs are just set, 11 to 13 minutes.\nWhile the eggs bake, in a small pot or butter warmer, heat 2 Tbsp. unsalted butter, ghee, or olive oil over medium heat. Add ½ tsp. cumin seeds; swirl the pan until the seeds start to sizzle and brown, 30 seconds to 1 minute. Remove from the heat.\nDrizzle the finished eggs with the butter mixture, season with salt and pepper, and garnish with parsley before serving.",
    "Image_Name": "spiced-lentil-and-caramelized-onion-baked-eggs",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AA{...}Yor//Z"
  }
]

```

##### Sample Request

Search all recipes, modified pagination, 5 results per page, show second page

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=2&per_page=5&uid=0
>

##### Sample Response

```
[
  {
    "Rid": 5,
    "Title": "Warm Comfort",
    "Ingredients": "['2 chamomile tea bags', '1½ oz. reposado tequila', '¾ oz. fresh lemon juice', '1 Tbsp. agave nectar']",
    "Instructions": "Place 2 chamomile tea bags in a heatsafe vessel, such as a large liquid measuring cup. Pour in 1 ½ cups boiling water, and let steep 5 minutes, then remove tea bags.\nAdd 1 ½ oz. reposado tequila, ¾ oz. fresh lemon juice, and 1 Tbsp. agave nectar and stir until incorporated. Pour into a 16-ounce insulated mug (or two smaller 8-ounce mugs) and drink hot.",
    "Image_Name": "warm-comfort-tequila-chamomile-toddy",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}TNf/Z"
    },
    {...}, //Represents truncated results, 3 removed.
    {
    "Rid": 9,
    "Title": "Spiced Lentil and Caramelized Onion Baked Eggs",
    "Ingredients": "['1 (14.5-ounce) can basic lentil soup, like Amy’s', '1 large onion, thinly sliced', '½ tsp. turmeric', '1 tsp. cumin', '¼ tsp. Aleppo pepper or ⅛ tsp. crushed red pepper flakes', '2 Tbsp. tomato paste', '3 large eggs', '2 Tbsp. ghee, unsalted butter, or olive oil', '½ tsp. whole cumin seeds', 'Olive oil', 'Kosher salt and freshly ground black pepper', 'Parsley, for finishing']",
    "Instructions": "Place an oven rack in the center of the oven, then preheat to 350°F.\nIn a medium, oven-safe pan, heat 1 Tbsp. olive oil over medium heat. Add 1 large, thinly sliced onion and ½ tsp. Kosher salt. Cook, stirring often, until golden brown, about 25 minutes.\nAdd ½ tsp. turmeric, 1 tsp. cumin, ¼ tsp. Aleppo pepper (or ⅛ tsp. crushed red pepper flakes), and 2 Tbsp. tomato paste. Cook and stir constantly until the onions are coated and the tomato paste has darkened slightly, about 2 minutes. Add ⅓ cup water; stir and scrape up all the browned bits on the bottom of the pan for 1 to 2 minutes, or until the liquid looks thickened and saucy. Add one 14-oz. can of lentil soup; cook, stirring to combine, 1 to 2 minutes. Turn off the heat and season with salt, pepper, and more Aleppo pepper or red pepper flakes to taste.\nUsing a spoon, create 3 wells in the lentil mixture. Carefully crack 1 egg into each well. Transfer the pan to the oven and bake until the whites of the eggs are just set, 11 to 13 minutes.\nWhile the eggs bake, in a small pot or butter warmer, heat 2 Tbsp. unsalted butter, ghee, or olive oil over medium heat. Add ½ tsp. cumin seeds; swirl the pan until the seeds start to sizzle and brown, 30 seconds to 1 minute. Remove from the heat.\nDrizzle the finished eggs with the butter mixture, season with salt and pepper, and garnish with parsley before serving.",
    "Image_Name": "spiced-lentil-and-caramelized-onion-baked-eggs",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}q0Yor//Z"
    }
]
```

##### Sample Request

Search by keyword using default pagination

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=1&per_page=10&ingredient=claw&uid=0


##### Sample Response

```
[
  {
    "Rid": 717,
    "Title": "Crawfish Salad",
    "Ingredients": "['1/2 cup crab claw meat, bits removed', '2 cups boiled crawfish tails', '1/2 pound boiled, peeled shrimp', '2 large celery stalks, sliced (about 1 cup)', '1/4 cup green bell pepper', '3/4 teaspoon salt', '1/8 teaspoon ground black pepper', '1/2 cup mayonnaise', '3 tablespoons lemon juice', 'Pinch of cayenne pepper']",
    "Instructions": "Mix everything together in a bowl and then refrigerate until you are ready to serve. It’s really that easy. (I like to mix the mayo and lemon juice together before stirring it into the rest of the ingredients.)\nDo Ahead: Will keep in an airtight container for up to three days before getting funky.",
    "Image_Name": "crawfish-salad",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}zdzX//Z"
    },
    {...}, //Represents truncated results, 8 removed.
    {
    "Rid": 11320,
    "Title": "Lobster Gelees with Fresh Tarragon Oil",
    "Ingredients": "['8 quarts water', '4 (1 1/4-lb) live lobsters', '1 cup dry white wine', '3 carrots, chopped', '2 celery ribs, chopped', '1 fennel bulb (sometimes labeled \"anise\") with fronds, stalks, and bulb chopped and fronds reserved for fresh tarragon oil', '1 medium onion, finely chopped', '3 large garlic cloves, minced', '3 (6-inch) plus 8 (1-inch) sprigs fresh tarragon', '1 teaspoon salt', '1/4 teaspoon fennel seeds, slightly crushed', '1/4 teaspoon dried hot red-pepper flakes', '2 1/2 teaspoons unflavored gelatin (from two 1/4-oz envelopes)', '1 1/2 teaspoons tarragon white-wine vinegar', '1/3 cup fresh tarragon oil', 'Accompaniment: lobster claw toasts', 'a 10- to 12-qt pot; heavy-duty (sometimes labeled \"fine\") cheesecloth; 8 (5- to 6-oz) baba au rhum molds or ramekins']",
    "Instructions": "Bring 6 quarts water to a boil in pot, then plunge 2 lobsters headfirst into water and cook, covered, 8 minutes from time they enter water. Transfer with tongs to a shallow baking pan to cool. Return water to a boil and cook remaining 2 lobsters in same manner.\nWhen lobsters are cool enough to handle, remove meat from tail and claws and set aside. Cut tail shells and lobster bodies (not including claws) into 1-inch pieces with kitchen shears, then rinse well, discarding gills, eye sacs, tomalley, any roe, and claw shells. Transfer to a 6- to 8-quart heavy pot, then add wine, carrots, celery, fennel, onion, garlic, large tarragon sprigs, salt, fennel seeds, red-pepper flakes, and remaining 2 quarts water and bring to a boil. Reduce heat and simmer, uncovered, until liquid is reduced to about 6 cups, about 1 1/2 hours.\nWhile stock reduces, scrape any coagulated white albumin from lobster meat with a knife and cut meat into 1/2-inch pieces, then chill, covered.\nPour stock through a dampened cheesecloth-lined large sieve into a large bowl, pressing on and then discarding solids. Transfer 2 3/4 cups stock to a bowl. (Cool remaining stock completely, uncovered, then freeze in an airtight container for another use.) Sprinkle gelatin evenly over 1/4 cup stock in a 1-quart saucepan, then let stand 1 minute to soften. Heat over moderately low heat, stirring, just until gelatin is dissolved, then stir in vinegar and remaining 2 1/2 cups stock.\nPut molds in a baking pan. Add 2 teaspoons gelatin mixture to each mold and freeze until set, about 10 minutes. Put 1 small sprig of tarragon and a tip of claw meat in bottom of each mold, then divide lobster meat among molds. Fill with remaining gelatin mixture and chill, covered with plastic wrap, until set, at least 2 hours.\nTo unmold, dip 1 mold in a pan of hot water 3 to 5 seconds to loosen. Run a thin knife around edge of mold and invert gelée out onto a plate. Repeat with remaining molds. Drizzle plates with fresh tarragon oil .",
    "Image_Name": "lobster-gelees-with-fresh-tarragon-oil-236654",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}0fP8A/9k="
    }
]
```

##### Sample Request

Search by ingredient using default pagination

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=1&per_page=10&ingredient=boysenberry&uid=0
>

##### Sample Response
```
[
  {
    "Rid": 10122,
    "Title": "Lemon Souffles with Boysenberries",
    "Ingredients": "['6 teaspoons seedless boysenberry jam', '24 frozen boysenberries or blackberries', '2 tablespoons finely grated lemon peel', '3/4 cup sugar, divided', '1 tablespoon cornstarch', '3/4 cup whole milk', '3 large eggs, separated', '2 tablespoons (1/4 stick) butter', '5 tablespoons fresh lemon juice', 'Powdered sugar']",
    "Instructions": "Preheat oven to 400°F. Butter six 3/4-cup ramekins; coat with sugar. Spoon 1 teaspoon jam and 4 frozen berries into bottom of each ramekin. Place on baking sheet. Mash lemon peel and 1/2 cup sugar in heavy medium saucepan; whisk in cornstarch, then milk and yolks. Add 2 tablespoons butter. Bring to boil over medium heat, whisking constantly. Boil until thick pudding forms, whisking constantly, about 1 minute. Transfer to large bowl; mix in lemon juice. Season to taste with salt.\nUsing electric mixer, beat egg whites in medium bowl to soft peaks. Gradually beat in 1/4 cup sugar; beat until stiff but not dry. Fold whites into warm lemon pudding. Spoon mixture atop berries; fill to top. Bake until puffed, set, and golden around edges, about 14 minutes. Sift powdered sugar over.",
    "Image_Name": "lemon-souffles-with-boysenberries-241606",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}SVWQT/2Q=="
    },
    {
    "Rid": 12837,
    "Title": "Roast Lamb with Marionberry-Pecan Crust",
    "Ingredients": "['2 well-trimmed racks of lamb (each about 1 1/4 pounds)', '6 tablespoons marionberry or boysenberry jam', '1/4 cup Dijon mustard', '3/4 cup finely chopped pecans', '6 tablespoons minced fresh Italian parsley', '3/4 cup fresh breadcrumbs made from crustless French bread', '4 tablespoons (1/2 stick) butter,melted']",
    "Instructions": "Preheat oven to 425°F. Sprinkle lamb with salt and pepper. Combine jam and Dijon mustard in small bowl; whisk to blend. Mix pecans, Italian parsley, and fresh breadcrumbs in another small bowl to blend. Spread half of mustard glaze over rounded side of each lamb rack. Pat half of breadcrumb mixture over mustard glaze on each. Drizzle each with 2 tablespoons melted butter. Transfer lamb to large rimmed baking sheet. Roast until breadcrumb topping is golden and thermometer inserted into lamb registers 130°F for medium-rare, about 30 minutes. Cut racks between bones into individual chps and serve.",
    "Image_Name": "roast-lamb-with-marionberry-pecan-crust-231289",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}VXJZKn/2Q=="
    }
]
```

##### Sample Request

Search by combination keyword and ingredient, default pagination

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=1&per_page=10&keyword=crock%20pot&ingredient=chicken&uid=0
>

##### Sample Response
```
[
  {
    "Rid": 3874,
    "Title": "Herbed Chicken in the Slow Cooker",
    "Ingredients": "['2 teaspoons poultry seasoning', '1 teaspoon paprika', '1/2 teaspoon garlic powder', '1 teaspoon salt', '4-5 pound whole organic chicken']",
    "Instructions": "1. In a small bowl, combine the poultry seasoning, paprika, garlic powder, and salt.\n2. Rub the seasoning mixture all over the chicken.\n3. Place the chicken in the crock pot, cover, and cook on high for 2 1/2–3 hours, until a meat thermometer reads 160°F.\n4. Allow the chicken to rest for 10 minutes before slicing.",
    "Image_Name": "herbed-chicken-in-the-slow-cooker-56389484",
    "Uid": 1,
    "Email": "Mallow",
    "Image": "/9j/4AAQ{...}eHBn/9k="
    },
    {
    "Rid": 13526,
    "Title": "Shannon's quick & spicy crock pot chicken soup",
    "Ingredients": "['Chicken', 'Broth', 'Noodles', 'Cayenne pepper']",
    "Instructions": "Put the ingredients in the crock pot.\nCook on high for 4 hours.\nLet cool then serve.",
    "Image_Name": "",
    "Uid": 7,
    "Email": "shannon@yahoo.com",
    "Image": null
  }
]
```

##### Sample Request

Search by combination keyword and ingredient, default pagination, filter by user's recipes

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=1&per_page=10&keyword=crock%20pot&ingredient=chicken&uid=7
>

##### Sample Response
```
[
  {
    "Rid": 13526,
    "Title": "Shannon's quick & spicy crock pot chicken soup",
    "Ingredients": "['Chicken', 'Broth', 'Noodles', 'Cayenne pepper']",
    "Instructions": "Put the ingredients in the crock pot.\nCook on high for 4 hours.\nLet cool then serve.",
    "Image_Name": "",
    "Uid": 7,
    "Email": "shannon@yahoo.com",
    "Image": null
  }
]
```

##### Recipe - Get Count

> HTTP
> 
> GET http://localhost:5000/server/recipecount

##### URI Parameters

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| id                  | False       | string    | Unique id of recipe   |
| keyword             | False       | string    | Search keyword        |
| ingredient          | False       | string    | Search ingredient     |

##### Request Body

Empty

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | No recipes returned     |

##### Sample Request

Default, get count of all recipes

> HTTP
>
> GET http://localhost:5000/server/recipecount?uid=0
>

##### Sample Response
```
{
  "total": 13528
}
```

##### Sample Request

Get count of recipes for a specific user

> HTTP
>
> GET http://localhost:5000/server/recipecount?uid=2
>

##### Sample Response
```
{
  "total": 7
}
```

##### Sample Request

Get count of recipes filtered by keyword

> HTTP
>
> GET http://localhost:5000/server/recipecount?keyword=crock%20pot&uid=0
>

##### Sample Response
```
{
  "total": 5
}
```

##### Sample Request

Get count of recipes filtered by keyword and ingredient

> HTTP
>
> GET http://localhost:5000/server/recipecount?keyword=crock%20pot&ingredient=chicken&uid=0
>

##### Sample Response
```
{
  "total": 2
}
```

##### Sample Request

Get count of recipes filtered by keyword and ingredient, for a specific user

> HTTP
>
> GET http://localhost:5000/server/recipecount?keyword=crock%20pot&ingredient=chicken&uid=2
>

##### Sample Response
```
{
  "total": 0
}
```

#### Meals

##### Operations

|               |                                               |
| :---          | :---                                          |
| Create        | Create a Meal                                 |
| Delete        | Delete a Meal                                 |
| Edit          | Edit a Meal                                   |
| Get (by date) | Retrieve Meals in a week-long period          |

##### Meals - Create

> HTTP
> 
> POST http://localhost:5000/server/meals/add

##### Request Body

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| date                | True        | string    | Date to schedule      |
| recipeid            | True        | uint      | Unique id of recipe   |
| mealtype            | True        | string    | Type of Meal (Breakfast/Lunch/Dinner/Other)      |
| userid              | True        | uint      | User ID               |

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | Recipe does not have allowed type |
| 400 Bad Request | Error     | User does not exist     |
| 400 Bad Request | Error     | Recipe does not exist   |
| 400 Bad Request | Error     | Failed to create meal   |

##### Sample Request

Create a meal for user 124, schedule for 4/30/2023 as a Breakfast meal

> HTTP
>
> POST http://localhost:5000/server/meals/add
>  \
> -H 'accept: application/json' \
> -H 'Content-Type: application/json' \
> -d '{
> "date": "2023-04-30",
> "mealtype": "Breakfast",
> "recipeid": 5,
> "userid": 124}'
>

##### Sample Response
```
{
  "Mid": 466,
  "Userid": 124,
  "Recipeid": 5,
  "Date": "2023-04-30",
  "Mealtype": "Breakfast",
}
```

##### Meals - Delete

> HTTP
> 
> DELETE http://localhost:5000/server/meals/delete{id}

##### Request Body

Empty

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | Could not delete meal   |

##### Sample Request

Delete meal 466

> HTTP
> 
> DELETE http://localhost:5000/server/meals/delete/466
> 

##### Sample Response
```
{}
```

##### Meals - Edit

> HTTP
> 
> POST http://localhost:5000/server/meals/edit

##### Request Body

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| date                | True        | string    | Date to schedule      |
| mid                 | True        | string    | Unique id of meal     |
| mealtype            | True        | string    | Type of Meal (Breakfast/Lunch/Dinner/Other      |

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | Failed to update meal   |

##### Sample Request

Edit meal 425 to be scheduled 4/22/2023 for Lunch

> HTTP
> 
>'PUT' \
>  'http://localhost:5000/server/meals/edit' \
>  -H 'accept: application/json' \
>  -H 'Content-Type: application/json' \
>  -d '{
>  "date": "2023-04-22",
>  "mealtype": "Lunch",
>  "mid": 425
>}'
>

##### Sample Response
```
{  
  "Mid": 425,
  "Userid": 124,
  "Recipeid": 39,
  "Date": "2023-04-22",
  "Mealtype": "Lunch",
}
```

##### Meals - Get (by date)

> HTTP
> 
> GET http://localhost:5000/server/meals/bydate

##### URI Parameters

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| date                | True        | string    | Date to query         |
| uid                 | True        | string    | User ID               |    

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |


##### Sample Request

Get a week of meals scheduled for user 8 starting 4/20/2023

> HTTP
> 
>   GET http://localhost:5000/server/meals/bydate?date=2023-04-20&uid=8
>

##### Sample Response
```
[
  {
    "Mid": 428,
    "Date": "2023-04-21T07:00:00.000Z",
    "Mealtype": "Lunch",
    "Title": "Grilling Cheese With Sweet Peppers and Black Lentils",
    "Ingredients": "['Kosher salt', '¾ cup black beluga lentils', '3 Tbsp. sherry vinegar or red wine vinegar', '1 Tbsp. honey', '5 Tbsp. extra-virgin olive oil, divided', 'Freshly ground black pepper', '8 oz. grilling cheese (such as bread, Halloumi, or paneer), torn into 2\" pieces', '1 lb. sweet mini peppers, ribs and seeds removed, halved lengthwise, cut into thirds if large', '½ tsp. dried oregano', '¼ cup (packed) basil leaves, torn if large', 'Flaky sea salt']",
    "Instructions": "Bring a medium pot of salted water to a boil. Add lentils and cook until just tender but not falling apart (they should hold their shape), about 20 minutes. Drain well.\nMeanwhile, whisk vinegar, honey, and 3 Tbsp. oil in a small bowl to combine; season with kosher salt and pepper. Set dressing aside.\nHeat 1 Tbsp. oil in a large skillet over medium-high. Add cheese and cook, turning occasionally, until heated through and brown and crispy on all sides, about 5 minutes total. (Some varieties of paneer are made without salt; if using one of these, season your pieces of cheese while cooking.) Transfer to a plate.\nAdd remaining 1 Tbsp. oil to same pan, then add sweet peppers and oregano. Season with kosher salt and black pepper and cook over medium-high, stirring and pressing down occasionally on sweet peppers with a wooden spoon so they make good contact with the pan, until softened and blistered in spots, 20–25 minutes. Remove from heat.\nAdd warm lentils and reserved dressing to pan and toss to combine, then toss in cheese.\nTransfer sweet pepper mixture to a platter or plates. Top with basil and season with sea salt and more black pepper.",
    "Image_Name": "grilling-cheese-with-sweet-peppers-and-black-lentils-recipe",
    "Email": "123",
    "Image": "/9j/4AAQSkZ{...}AE1mo/WaKK//2Q=="
  },
  {
    "Mid": 258,
    "Date": "2023-04-24T07:00:00.000Z",
    "Mealtype": "Other",
    "Title": "Miso-Butter Roast Chicken With Acorn Squash Panzanella",
    "Ingredients": "['1 (3½–4-lb.) whole chicken', '2¾ tsp. kosher salt, divided, plus more', '2 small acorn squash (about 3 lb. total)', '2 Tbsp. finely chopped sage', '1 Tbsp. finely chopped rosemary', '6 Tbsp. unsalted butter, melted, plus 3 Tbsp. room temperature', '¼ tsp. ground allspice', 'Pinch of crushed red pepper flakes', 'Freshly ground black pepper', '⅓ loaf good-quality sturdy white bread, torn into 1\" pieces (about 2½ cups)', '2 medium apples (such as Gala or Pink Lady; about 14 oz. total), cored, cut into 1\" pieces', '2 Tbsp. extra-virgin olive oil', '½ small red onion, thinly sliced', '3 Tbsp. apple cider vinegar', '1 Tbsp. white miso', '¼ cup all-purpose flour', '2 Tbsp. unsalted butter, room temperature', '¼ cup dry white wine', '2 cups unsalted chicken broth', '2 tsp. white miso', 'Kosher salt, freshly ground pepper']",
    "Instructions": "Pat chicken dry with paper towels, season all over with 2 tsp. salt, and tie legs together with kitchen twine. Let sit at room temperature 1 hour.\nMeanwhile, halve squash and scoop out seeds. Run a vegetable peeler along ridges of squash halves to remove skin. Cut each half into ½\"-thick wedges; arrange on a rimmed baking sheet.\nCombine sage, rosemary, and 6 Tbsp. melted butter in a large bowl; pour half of mixture over squash on baking sheet. Sprinkle squash with allspice, red pepper flakes, and ½ tsp. salt and season with black pepper; toss to coat.\nAdd bread, apples, oil, and ¼ tsp. salt to remaining herb butter in bowl; season with black pepper and toss to combine. Set aside.\nPlace onion and vinegar in a small bowl; season with salt and toss to coat. Let sit, tossing occasionally, until ready to serve.\nPlace a rack in middle and lower third of oven; preheat to 425°F. Mix miso and 3 Tbsp. room-temperature butter in a small bowl until smooth. Pat chicken dry with paper towels, then rub or brush all over with miso butter. Place chicken in a large cast-iron skillet and roast on middle rack until an instant-read thermometer inserted into the thickest part of breast registers 155°F, 50–60 minutes. (Temperature will climb to 165°F while chicken rests.) Let chicken rest in skillet at least 5 minutes, then transfer to a plate; reserve skillet.\nMeanwhile, roast squash on lower rack until mostly tender, about 25 minutes. Remove from oven and scatter reserved bread mixture over, spreading into as even a layer as you can manage. Return to oven and roast until bread is golden brown and crisp and apples are tender, about 15 minutes. Remove from oven, drain pickled onions, and toss to combine. Transfer to a serving dish.\nUsing your fingers, mash flour and butter in a small bowl to combine.\nSet reserved skillet with chicken drippings over medium heat. You should have about ¼ cup, but a little over or under is all good. (If you have significantly more, drain off and set excess aside.) Add wine and cook, stirring often and scraping up any browned bits with a wooden spoon, until bits are loosened and wine is reduced by about half (you should be able to smell the wine), about 2 minutes. Add butter mixture; cook, stirring often, until a smooth paste forms, about 2 minutes. Add broth and any reserved drippings and cook, stirring constantly, until combined and thickened, 6–8 minutes. Remove from heat and stir in miso. Taste and season with salt and black pepper.\nServe chicken with gravy and squash panzanella alongside.",
    "Image_Name": "miso-butter-roast-chicken-acorn-squash-panzanella",
    "Email": "123",
    "Image": "/9j/4AAQSkZJRg{...}zRRX//2Q=="
  },
  {
    "Mid": 291,
    "Date": "2023-04-24",
    "Mealtype": "Other",
    "Title": "Crispy Salt and Pepper Potatoes",
    "Ingredients": "['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley']",
    "Instructions": "Preheat oven to 400°F and line a rimmed baking sheet with parchment. In a large bowl, whisk the egg whites until foamy (there shouldn’t be any liquid whites in the bowl). Add the potatoes and toss until they’re well coated with the egg whites, then transfer to a strainer or colander and let the excess whites drain. Season the potatoes with the salt, pepper, and herbs. Scatter the potatoes on the baking sheet (make sure they’re not touching) and roast until the potatoes are very crispy and tender when poked with a knife, 15 to 20 minutes (depending on the size of the potatoes).\nTransfer to a bowl and serve.",
    "Image_Name": "crispy-salt-and-pepper-potatoes-dan-kluger",
    "Email": "123",
    "Image": "/9j/4AAQSkZJRgABAQAA{...}tVowz/2Q=="
  },
  {
    "Mid": 249,
    "Date": "2023-04-22",
    "Mealtype": "Other",
    "Title": "Turmeric Hot Toddy",
    "Ingredients": "['¼ cup granulated sugar', '¾ tsp. ground turmeric', '1 ½ oz. Amontillado sherry', '1 oz. bourbon, aged rum, Scotch, mezcal, or gin', '1 oz. Turmeric Syrup', '½ oz. fresh lemon juice', 'Garnish: Dehydrated lemon wheel (optional)']",
    "Instructions": "For the turmeric syrup, combine ½ cup hot water and ¼ cup sugar in a liquid measuring cup or mason jar. Add ¾ tsp. ground turmeric and stir—or seal and shake—until sugar is completely dissolved. (This makes enough syrup for 4 drinks. Syrup can be used immediately or refrigerated, covered, up to 10 days. Shake or stir before using to reincorporate turmeric.)\nFor the toddy, combine 1 ½ oz. Amontillado sherry, 1 oz. bourbon (or other spirit of choice), 1 oz. Turmeric Syrup, and ½ oz. fresh lemon juice in a sturdy pint glass or 16-ounce thermos. Top with 8 oz. hot water and stir gently. Garnish with dehydrated lemon wheel if desired.",
    "Image_Name": "turmeric-hot-toddy-claire-sprouse",
    "Email": "123",
    "Image": "/9j/4AAQSkZJRgABA{...}JF//2Q=="
  },
  {
    "Mid": 251,
    "Date": "2023-04-20",
    "Mealtype": "Lunch",
    "Title": "Enfrijoladas",
    "Ingredients": "['5 Tbsp. vegetable oil, divided', '8 corn tortillas', '12 oz. fresh chorizo', '3 garlic cloves, crushed', '½ medium white onion, thinly sliced, plus more for serving', 'Kosher salt', '2 (15-oz.) cans black beans, rinsed, or 3 cups Frijoles de la Olla, drained', '1½ cups low-sodium chicken broth', '6 oz. queso fresco or Cotija cheese, crumbled', 'Cilantro leaves with tender stems and sliced avocado (for serving)']",
    "Instructions": "Using 2 Tbsp. oil, brush both sides of each tortilla. Heat a large skillet over medium-high. Working in batches, cook until lightly browned and starting to crisp, about 1 minute per side. Set aside.\nHeat remaining 3 Tbsp. oil in same skillet over medium-high. Cook chorizo, breaking up with a wooden spoon, until browned and cooked through, 7–9 minutes. Using a slotted spoon, transfer to a medium bowl; set aside.\nAdd garlic and ½ onion to same skillet, season with salt, and cook, tossing occasionally, until tender and beginning to brown, 6–8 minutes. Using slotted spoon, transfer garlic mixture to a blender; reserve pan with oil. Add beans and broth to blender and purée until smooth (it should be the consistency of yogurt); season with salt.\nSet reserved pan over medium-high and heat oil. Transfer bean purée to skillet and bring to a boil. Reduce heat to low. Working one at a time and using tongs, dip tortillas in bean purée, turning to coat and leaving until softened, about 3 seconds per side (they will soften more as they sit). Transfer to a baking sheet as you go. Spoon 1 Tbsp. chorizo and 1 Tbsp. queso fresco across the center of each tortilla; fold over like a taco.\nDivide among plates and spoon remaining bean purée over. Top with cilantro, avocado, more onion, remaining chorizo, and remaining queso.",
    "Image_Name": "enfrijoladas",
    "Email": "123",
    "Image": "/9j/4AAQSkZJRg{...}fx/0r//Z"
  },
  {
    "Mid": 254,
    "Date": "2023-04-21",
    "Mealtype": "Dinner",
    "Title": "Spiral Ham in the Slow Cooker",
    "Ingredients": "['1 (6- to 7-pound) bone-in, hickory-smoked, uncured fully cooked ham', '5 medium parsnips, peeled and halved lengthwise', '5 medium carrots, peeled and halved lengthwise', '1 cup maple syrup', '2 cups unsweetened apple juice', '½ cup packed dark brown sugar', '½ cup smooth Dijon mustard', '½ cup grainy Dijon mustard', '2 tablespoons apple cider vinegar', 'Kosher salt (if needed)']",
    "Instructions": "Pour 3 cups of water into a 7-quart slow cooker. Add the ham, cut-side up, as well as the parsnips and carrots. Pour the maple syrup and apple juice over the ham, and sprinkle the brown sugar over the top. Cook on high, uncovered, for 30 to 45 minutes, then cover the slow cooker and cook on low until the ham is tender, 3 to 4 hours. Hams vary in size and tenderness, so be patient. When it’s tender, the meat should come off the bone with very little resistance. Taste a small piece for tenderness.\nTransfer the ham and vegetables to a deep serving platter (reserve the liquid in the pot). Use a pair of kitchen shears or scissors to cut the slices of ham off the bone and let them fall onto the platter. Stir both kinds of mustard and the vinegar into the cooking liquid left in the slow cooker and taste for seasoning—the sauce may or may not need salt. Pour the liquid over the ham and vegetables, and serve.",
    "Image_Name": "spiral-ham-in-the-slow-cooker-guarnaschelli",
    "Email": "123",
    "Image": "/9j/4AAQSkZ{...}1M16v/2Q=="
  },
  {
    "Mid": 257,
    "Date": "2023-04-26",
    "Mealtype": "Dinner",
    "Title": "Thanksgiving Mac and Cheese",
    "Ingredients": "['1 cup evaporated milk', '1 cup whole milk', '1 tsp. garlic powder', '1 tsp. onion powder', '1 tsp. smoked paprika', '½ tsp. freshly ground black pepper', '1 tsp. kosher salt, plus more', '2 lb. extra-sharp cheddar, coarsely grated', '4 oz. full-fat cream cheese', '1 lb. elbow macaroni']",
    "Instructions": "Place a rack in middle of oven; preheat to 400°. Bring evaporated milk and whole milk to a bare simmer in a large saucepan over medium heat. Whisk in garlic powder, onion powder, paprika, pepper, and 1 tsp. salt. Working in batches, whisk in three fourths of the cheddar, then all of the cream cheese.\nMeanwhile, bring a large pot of generously salted water to a boil (it should have a little less salt than seawater). Cook macaroni, stirring occasionally, until very al dente, about 4 minutes. Drain in a colander.\nAdd macaroni to cheese sauce in pan and mix until well coated. Evenly spread out half of macaroni mixture in a 13x9\" baking dish. Sprinkle half of remaining cheddar evenly over. Layer remaining macaroni mixture on top and sprinkle with remaining cheddar. Bake until all of the cheese is melted, about 10 minutes. Let cool slightly before serving.",
    "Image_Name": "thanksgiving-mac-and-cheese-erick-williams",
    "Email": "123",
    "Image": "/9j/4AA{..}1GGf/9k="
  }
]
```



## Swagger

Our internal API document can be found at:

http://localhost:5000/server/docs/index.html#  when running the server locally.

![The API test platform](https://media.discordapp.net/attachments/1062897591240638631/1090425713775087626/image.png?width=804&height=645)

Example trying out a sample API call:
![Sample API call](https://media.discordapp.net/attachments/1062897591240638631/1090425871535444008/image.png?width=828&height=645)
