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
| TestRecipesRoute          | Number of recipes returned = records in database          |
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
```
{
  "Rid": 1,
  "Title": "Crispy Salt and Pepper Potatoes",
  "Ingredients": "['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley']",
  "Instructions": "Preheat oven to 400°F and line a rimmed baking sheet with parchment. In a large bowl, whisk the egg whites until foamy (there shouldn’t be any liquid whites in the bowl). Add the potatoes and toss until they’re well coated with the egg whites, then transfer to a strainer or colander and let the excess whites drain. Season the potatoes with the salt, pepper, and herbs. Scatter the potatoes on the baking sheet (make sure they’re not touching) and roast until the potatoes are very crispy and tender when poked with a knife, 15 to 20 minutes (depending on the size of the potatoes).\nTransfer to a bowl and serve.",
  "Image_Name": "crispy-salt-and-pepper-potatoes-dan-kluger",
  "Cleaned_Ingredients": "['2 large egg whites', '1 pound new potatoes (about 1 inch in diameter)', '2 teaspoons kosher salt', '¾ teaspoon finely ground black pepper', '1 teaspoon finely chopped rosemary', '1 teaspoon finely chopped thyme', '1 teaspoon finely chopped parsley']"  
}
```

##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes?ingredient=claw
>

##### Sample Response
```
[
  {
    "Rid": 717,    
    "Title": "Crawfish Salad",    
    "Ingredients": "['1/2 cup crab claw meat, bits removed', '2 cups boiled crawfish tails', '1/2 pound boiled, peeled shrimp', '2 large                    celery stalks, sliced (about 1 cup)', '1/4 cup green bell pepper', '3/4 teaspoon salt', '1/8 teaspoon ground black                       pepper', '1/2 cup mayonnaise', '3 tablespoons lemon juice', 'Pinch of cayenne pepper']",    
    "Instructions": "Mix everything together in a bowl and then refrigerate until you are ready to serve. It’s really that easy. (I like                     to mix the mayo and lemon juice together before stirring it into the rest of the ingredients.)\nDo Ahead: Will keep >                     in an airtight container for up to three days before getting funky.",    
    "Image_Name": "crawfish-salad",    
    "Cleaned_Ingredients": "['1/2 cup crab claw meat, bits removed', '2 cups boiled crawfish tails', '1/2 pound boiled, peeled shrimp', >                              '2 large celery stalks, sliced (about 1 cup)', '1/4 cup green bell pepper', '3/4 teaspoon salt', '1/8 >     >                                teaspoon ground black pepper', '1/2 cup mayonnaise', '3 tablespoons lemon juice', 'Pinch of cayenne >   >                               pepper']"    
  }, 
  {...}, //Where 5 results are truncated
  {
        "Rid": 11320,
        "Title": "Lobster Gelees with Fresh Tarragon Oil",
        "Ingredients": "['8 quarts water', '4 (1 1/4-lb) live lobsters', '1 cup dry white wine', '3 carrots, chopped', '2 celery ribs, chopped', '1 fennel bulb (sometimes labeled \"anise\") with fronds, stalks, and bulb chopped and fronds reserved for fresh tarragon oil', '1 medium onion, finely chopped', '3 large garlic cloves, minced', '3 (6-inch) plus 8 (1-inch) sprigs fresh tarragon', '1 teaspoon salt', '1/4 teaspoon fennel seeds, slightly crushed', '1/4 teaspoon dried hot red-pepper flakes', '2 1/2 teaspoons unflavored gelatin (from two 1/4-oz envelopes)', '1 1/2 teaspoons tarragon white-wine vinegar', '1/3 cup fresh tarragon oil', 'Accompaniment: lobster claw toasts', 'a 10- to 12-qt pot; heavy-duty (sometimes labeled \"fine\") cheesecloth; 8 (5- to 6-oz) baba au rhum molds or ramekins']",
        "Instructions": "Bring 6 quarts water to a boil in pot, then plunge 2 lobsters headfirst into water and cook, covered, 8 minutes from time they enter water. Transfer with tongs to a shallow baking pan to cool. Return water to a boil and cook remaining 2 lobsters in same manner.\nWhen lobsters are cool enough to handle, remove meat from tail and claws and set aside. Cut tail shells and lobster bodies (not including claws) into 1-inch pieces with kitchen shears, then rinse well, discarding gills, eye sacs, tomalley, any roe, and claw shells. Transfer to a 6- to 8-quart heavy pot, then add wine, carrots, celery, fennel, onion, garlic, large tarragon sprigs, salt, fennel seeds, red-pepper flakes, and remaining 2 quarts water and bring to a boil. Reduce heat and simmer, uncovered, until liquid is reduced to about 6 cups, about 1 1/2 hours.\nWhile stock reduces, scrape any coagulated white albumin from lobster meat with a knife and cut meat into 1/2-inch pieces, then chill, covered.\nPour stock through a dampened cheesecloth-lined large sieve into a large bowl, pressing on and then discarding solids. Transfer 2 3/4 cups stock to a bowl. (Cool remaining stock completely, uncovered, then freeze in an airtight container for another use.) Sprinkle gelatin evenly over 1/4 cup stock in a 1-quart saucepan, then let stand 1 minute to soften. Heat over moderately low heat, stirring, just until gelatin is dissolved, then stir in vinegar and remaining 2 1/2 cups stock.\nPut molds in a baking pan. Add 2 teaspoons gelatin mixture to each mold and freeze until set, about 10 minutes. Put 1 small sprig of tarragon and a tip of claw meat in bottom of each mold, then divide lobster meat among molds. Fill with remaining gelatin mixture and chill, covered with plastic wrap, until set, at least 2 hours.\nTo unmold, dip 1 mold in a pan of hot water 3 to 5 seconds to loosen. Run a thin knife around edge of mold and invert gelée out onto a plate. Repeat with remaining molds. Drizzle plates with fresh tarragon oil .",
        "Image_Name": "lobster-gelees-with-fresh-tarragon-oil-236654",
        "Cleaned_Ingredients": "['8 quarts water', '4 (1 1/4-lb) live lobsters', '1 cup dry white wine', '3 carrots, chopped', '2 celery ribs, chopped', '1 fennel bulb (sometimes labeled \"anise\") with fronds, stalks, and bulb chopped and fronds reserved for fresh tarragon oil', '1 medium onion, finely chopped', '3 large garlic cloves, minced', '3 (6-inch) plus 8 (1-inch) sprigs fresh tarragon', '1 teaspoon salt', '1/4 teaspoon fennel seeds, slightly crushed', '1/4 teaspoon dried hot red-pepper flakes', '2 1/2 teaspoons unflavored gelatin (from two 1/4-oz envelopes)', '1 1/2 teaspoons tarragon white-wine vinegar', '1/3 cup fresh tarragon oil', 'Accompaniment: lobster claw toasts', 'a 10- to 12-qt pot; heavy-duty (sometimes labeled \"fine\") cheesecloth; 8 (5- to 6-oz) baba au rhum molds or ramekins']"
    }
]  
```

##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes?keyword=boysenberry
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
        "Cleaned_Ingredients": "['6 teaspoons seedless boysenberry jam', '24 frozen boysenberries or blackberries', '2 tablespoons finely grated lemon peel', '3/4 cup sugar, divided', '1 tablespoon cornstarch', '3/4 cup whole milk', '3 large eggs, separated', '2 tablespoons (1/4 stick) butter', '5 tablespoons fresh lemon juice', 'Powdered sugar']"
    },
    {
        "Rid": 12837,
        "Title": "Roast Lamb with Marionberry-Pecan Crust",
        "Ingredients": "['2 well-trimmed racks of lamb (each about 1 1/4 pounds)', '6 tablespoons marionberry or boysenberry jam', '1/4 cup Dijon mustard', '3/4 cup finely chopped pecans', '6 tablespoons minced fresh Italian parsley', '3/4 cup fresh breadcrumbs made from crustless French bread', '4 tablespoons (1/2 stick) butter,melted']",
        "Instructions": "Preheat oven to 425°F. Sprinkle lamb with salt and pepper. Combine jam and Dijon mustard in small bowl; whisk to blend. Mix pecans, Italian parsley, and fresh breadcrumbs in another small bowl to blend. Spread half of mustard glaze over rounded side of each lamb rack. Pat half of breadcrumb mixture over mustard glaze on each. Drizzle each with 2 tablespoons melted butter. Transfer lamb to large rimmed baking sheet. Roast until breadcrumb topping is golden and thermometer inserted into lamb registers 130°F for medium-rare, about 30 minutes. Cut racks between bones into individual chps and serve.",
        "Image_Name": "roast-lamb-with-marionberry-pecan-crust-231289",
        "Cleaned_Ingredients": "['2 well-trimmed racks of lamb (each about 1 1/4 pounds)', '6 tablespoons marionberry or boysenberry jam', '1/4 cup Dijon mustard', '3/4 cup finely chopped pecans', '6 tablespoons minced fresh Italian parsley', '3/4 cup fresh breadcrumbs made from crustless French bread', '4 tablespoons (1/2 stick) butter', 'melted']"
    }
]
```
##### Recipe - Get (Paginate)

> HTTP
> 
> GET http://localhost:5000/server/recipes/bypage

##### URI Parameters

|  Name               | Required    | Type      | Description           |
| :---                | :---        | :---      | :---                  |
| page                | False       | string    | Starting page of data |
| per_page            | False       | string    | Results per page      |

##### Request Body

Empty

##### Responses

| Name            | Type      | Description             |
| :---            | :---      | :---                    |
| 200 OK          | Recipe    | OK                      |
| 400 Bad Request | Error     | No recipes returned     |

##### Sample Request

> HTTP
>
> GET http://localhost:5000/server/recipes/bypage?page=2&per_page=5
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
        "Cleaned_Ingredients": "['2 chamomile tea bags', '1½ oz. reposado tequila', '¾ oz. fresh lemon juice', '1 Tbsp. agave nectar']"
    },
    {...}, //Represents truncated results, 3 removed.
    {
        "Rid": 9, 
        "Title": "Spiced Lentil and Caramelized Onion Baked Eggs",
        "Ingredients": "['1 (14.5-ounce) can basic lentil soup, like Amy’s', '1 large onion, thinly sliced', '½ tsp. turmeric', '1 tsp. cumin', '¼ tsp. Aleppo pepper or ⅛ tsp. crushed red pepper flakes', '2 Tbsp. tomato paste', '3 large eggs', '2 Tbsp. ghee, unsalted butter, or olive oil', '½ tsp. whole cumin seeds', 'Olive oil', 'Kosher salt and freshly ground black pepper', 'Parsley, for finishing']",
        "Instructions": "Place an oven rack in the center of the oven, then preheat to 350°F.\nIn a medium, oven-safe pan, heat 1 Tbsp. olive oil over medium heat. Add 1 large, thinly sliced onion and ½ tsp. Kosher salt. Cook, stirring often, until golden brown, about 25 minutes.\nAdd ½ tsp. turmeric, 1 tsp. cumin, ¼ tsp. Aleppo pepper (or ⅛ tsp. crushed red pepper flakes), and 2 Tbsp. tomato paste. Cook and stir constantly until the onions are coated and the tomato paste has darkened slightly, about 2 minutes. Add ⅓ cup water; stir and scrape up all the browned bits on the bottom of the pan for 1 to 2 minutes, or until the liquid looks thickened and saucy. Add one 14-oz. can of lentil soup; cook, stirring to combine, 1 to 2 minutes. Turn off the heat and season with salt, pepper, and more Aleppo pepper or red pepper flakes to taste.\nUsing a spoon, create 3 wells in the lentil mixture. Carefully crack 1 egg into each well. Transfer the pan to the oven and bake until the whites of the eggs are just set, 11 to 13 minutes.\nWhile the eggs bake, in a small pot or butter warmer, heat 2 Tbsp. unsalted butter, ghee, or olive oil over medium heat. Add ½ tsp. cumin seeds; swirl the pan until the seeds start to sizzle and brown, 30 seconds to 1 minute. Remove from the heat.\nDrizzle the finished eggs with the butter mixture, season with salt and pepper, and garnish with parsley before serving.", 
        "Image_Name": "spiced-lentil-and-caramelized-onion-baked-eggs",
        "Cleaned_Ingredients": "['1 (14.5-ounce) can basic lentil soup, like Amy’s', '1 large onion, thinly sliced', '½ tsp. turmeric', '1 tsp. cumin', '¼ tsp. Aleppo pepper or ⅛ tsp. crushed red pepper flakes', '2 Tbsp. tomato paste', '3 large eggs', '2 Tbsp. ghee, unsalted butter, or olive oil', '½ tsp. whole cumin seeds', 'Olive oil', 'Kosher salt and freshly ground black pepper', 'Parsley', 'for finishing']"
    }
]
```

Our internal API document can be found at:

http://localhost:5000/server/docs/index.html#  when running the server locally.
    


