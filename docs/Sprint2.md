# Sprint 2
2/8/2023 - 2/22/2023

## Work completed in sprint 2

### User Stories

### User stories planned for Sprint 2
As a group, we reviewed the incomplete user stories from Sprint 1 and the backlog of user stories and defined the goal for Sprint 2:
(Tasks marked with an * were transferred from Sprint 1)

#### Closed:

1. [1] As a visitor I want to register so I can access the features of the application. *
2. [2] As an existing visitor I want to login with my username and password so I can view my account. *
3. [3] As a user I can view an existing list of recipes so that I can decide what meals to make. * 

#### Open:

4. [17] As an application owner, I want to use a JSON web token to authorize specific users to access the application upon login, so  I can control access to the app, prevent malicious attacks, and prompt login/registration when needed.
5. [4] As a user, I can click on a recipe card (or a recipe in the list) to view a side pane pop-up blade with details about the recipe including ingredients and directions.
6. [18] As a user I recieve errors that help guide me so I know what to do next. 

### Tasks

#### Closed:

1. [1] Route user to home page upon successful registration in UI
2. [17] FE: If token doesn't exist (i.e. user not authenticated), route them to login page
3. [17] Add a flag that doesn't allow a user to access the homepage(/home) without logging in first
4. [4] BE function to return all recipe details for a specific recipe based on rid
5. [3] BE function to pass some fixed number of recipes (10,20) to support pagination on FE dashboard
6. [3] Backend: write search functions to get a recipe from the database

#### In Progress:

1. [3] Populate cards on the dashboard iwth real data from the recipe table in DB (Task complete, needs testing)
2. [3] Dynamically populate all recipe cards on the screen with recipe data (Task complete, needs testing)
3. [3] Add pagination component to recipe dashboard (Task complete, needs testing)

#### To Do:

1. [17] Test authentication
2. [3] Investigate BE & FE image strategy (stretch goal)
3. [18] Investigate error handling in Fe so we have a better idea of what errors to surface in the backend (stretch goal)
4. [4] Create FE screen to surface detailed recipe info
5. [4] Populate detailed recipe info onto screen
6. [4] Routing to click from recipe card (entry point) to details screen, and exit details screen

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

### Using the Mallow Web API


### REST Operation Groups

| Operation Group | Description                             |
| :---            | :---                                    |
| Recipes         | Provides operations related to Recipes  |
| Users           | Provides operations related to Users    |

#### Users

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
| Get           | Retrieve information about Recipe(s)          |
| Delete        | Delete a Recipe                               |

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
| cleaned_indredients | True        | string    | Ingredients sanitized |

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

##### Recipe - Get

> HTTP
> 
> GET http://localhost:5000/server/recipes

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
| 400 Bad Request | Error     | Recipe(s) not found     |

##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes?id=1
>

##### Sample Response

>{
>
> "Rid": 1,
> 
>  "Title": "Crispy Salt and Pepper Potatoes",
>  
>  "Ingredients": "['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley']",
>  
>  "Instructions": "Preheat oven to 400°F and line a rimmed baking sheet with parchment. In a large bowl, whisk the egg whites until foamy (there shouldn’t be any liquid whites in the bowl). Add the potatoes and toss until they’re well coated with the egg whites, then transfer to a strainer or colander and let the excess whites drain. Season the potatoes with the salt, pepper, and herbs. Scatter the potatoes on the baking sheet (make sure they’re not touching) and roast until the potatoes are very crispy and tender when poked with a knife, 15 to 20 minutes (depending on the size of the potatoes).\nTransfer to a bowl and serve.",
>  
>  "Image_Name": "crispy-salt-and-pepper-potatoes-dan-kluger",
>  
>  "Cleaned_Ingredients": "['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley']"
>  
>}



##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes?ingredient=claw
>

##### Sample Response

>[
>
>  {
>  
>    "Rid": 717,
>    
>    "Title": "Crawfish Salad",
>    
>    "Ingredients": "['1/2 cup crab claw meat, bits removed', '2 cups boiled crawfish tails', '1/2 pound boiled, peeled shrimp', '2 large                    celery stalks, sliced (about 1 cup)', '1/4 cup green bell pepper', '3/4 teaspoon salt', '1/8 teaspoon ground black                       pepper', '1/2 cup mayonnaise', '3 tablespoons lemon juice', 'Pinch of cayenne pepper']",
>    
>    "Instructions": "Mix everything together in a bowl and then refrigerate until you are ready to serve. It’s really that easy. (I like                     to mix the mayo and lemon juice together before stirring it into the rest of the ingredients.)\nDo Ahead: Will keep >                     in an airtight container for up to three days before getting funky.",
>    
>    "Image_Name": "crawfish-salad",
>    
>    "Cleaned_Ingredients": "['1/2 cup crab claw meat, bits removed', '2 cups boiled crawfish tails', '1/2 pound boiled, peeled shrimp', >                              '2 large celery stalks, sliced (about 1 cup)', '1/4 cup green bell pepper', '3/4 teaspoon salt', '1/8 >     >                                teaspoon ground black pepper', '1/2 cup mayonnaise', '3 tablespoons lemon juice', 'Pinch of cayenne >   >                               pepper']"
>    
>  }, 
>  
>  {...}

 
>]  

##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes?keyword=boysenberry
>

##### Sample Response

>[
>
>  {
>  
>    "Rid": 10122,
>    
>    "Title": "Lemon Souffles with Boysenberries",
>    
>    "Ingredients": "['6 teaspoons seedless boysenberry jam', '24 frozen boysenberries or blackberries', '2 tablespoons finely grated lemon peel', '3/4 cup sugar, divided', '1 tablespoon cornstarch', '3/4 cup whole milk', '3 large eggs, separated', '2 tablespoons (1/4 stick) butter', '5 tablespoons fresh lemon juice', 'Powdered sugar']",
>    
>    "Instructions": "Preheat oven to 400°F. Butter six 3/4-cup ramekins; coat with sugar. Spoon 1 teaspoon jam and 4 frozen berries into bottom of each ramekin. Place on baking sheet. Mash lemon peel and 1/2 cup sugar in heavy medium saucepan; whisk in cornstarch, then milk and yolks. Add 2 tablespoons butter. Bring to boil over medium heat, whisking constantly. Boil until thick pudding forms, whisking constantly, about 1 minute. Transfer to large bowl; mix in lemon juice. Season to taste with salt.\nUsing electric mixer, beat egg whites in medium bowl to soft peaks. Gradually beat in 1/4 cup sugar; beat until stiff but not dry. Fold whites into warm lemon pudding. Spoon mixture atop berries; fill to top. Bake until puffed, set, and golden around edges, about 14 minutes. Sift powdered sugar over.",
>   "Image_Name": "lemon-souffles-with-boysenberries-241606",
>    
>    "Cleaned_Ingredients": "['6 teaspoons seedless boysenberry jam', '24 frozen boysenberries or blackberries', '2 tablespoons finely grated lemon peel', '3/4 cup sugar, divided', '1 tablespoon cornstarch', '3/4 cup whole milk', '3 large eggs, separated', '2 tablespoons (1/4 stick) butter', '5 tablespoons fresh lemon juice', 'Powdered sugar']"
>    
>  },
>  
>  {
>    "Rid": 12837,
>    
>    "Title": "Roast Lamb with Marionberry-Pecan Crust",
>    
>    "Ingredients": "['2 well-trimmed racks of lamb (each about 1 1/4 pounds)', '6 tablespoons marionberry or boysenberry jam', '1/4 cup Dijon mustard', '3/4 cup finely chopped pecans', '6 tablespoons minced fresh Italian parsley', '3/4 cup fresh breadcrumbs made from crustless French bread', '4 tablespoons (1/2 stick) butter,melted']",
>    
>    "Instructions": "Preheat oven to 425°F. Sprinkle lamb with salt and pepper. Combine jam and Dijon mustard in small bowl; whisk to blend. Mix pecans, Italian parsley, and fresh breadcrumbs in another small bowl to blend. Spread half of mustard glaze over rounded side of each lamb rack. Pat half of breadcrumb mixture over mustard glaze on each. Drizzle each with 2 tablespoons melted butter. Transfer lamb to large rimmed baking sheet. Roast until breadcrumb topping is golden and thermometer inserted into lamb registers 130°F for medium-rare, about 30 minutes. Cut racks between bones into individual chps and serve.",
>    
>    "Image_Name": "roast-lamb-with-marionberry-pecan-crust-231289",
>    
>    "Cleaned_Ingredients": "['2 well-trimmed racks of lamb (each about 1 1/4 pounds)', '6 tablespoons marionberry or boysenberry jam', '1/4 cup Dijon mustard', '3/4 cup finely chopped pecans', '6 tablespoons minced fresh Italian parsley', '3/4 cup fresh breadcrumbs made from crustless French bread', '4 tablespoons (1/2 stick) butter', 'melted']"
>    
>  }
>  
>]


