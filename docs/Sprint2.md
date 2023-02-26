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
> POST http://localhost:5000/register

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
> POST http://localhost:5000/register
>
> {
>   
>     "email" : test@me.com
>   
>     "password" : dy%f99__gNg!88
>   
> }

##### User - Get

> HTTP
> 
> POST http://localhost:5000/login

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
> POST http://localhost:5000/login
>
>
> {
>   
>     "email" : test@me.com
>   
>     "password" : dy%f99__gNg!88
>   
> }

