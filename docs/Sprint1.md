# Sprint 1

## User stories

### The process of selecting user stories
In our Sprint 1 planning session, we narrowed down the list of user stories required for our application's minimum-viable-product (MVP) by ranking features from the [North-Star](RecipeAppRequirementSpec.md#feature-summary-and-user-stories) as:
* **P0** : Bare minimum functionality for the app to be useful
* **P1** : Functionality that is not absolutely necessary but would be frequently used and beneficial to users
* **P2** : Nice-to-have but the app would still function well without it

Those with majority P0 votes (three or more) were selected as the MVP user stories for sprint 1. Other items will be treated as stretch goals after the initial "phase" of work.

### The user stories selected by the SWErve team

1. As a new visitor I want to register so I can access the features of the application.
2. As an existing visitor I want to login with username and password so I can view my account.
3. As a user I can view an existing list of recipes so that I can decide what meals to make.
4. As a user I can click on a recipe card (or a recipe in the list) to view a side pane pop-up blade with details about the recipe including ingredients and directions. 
5. As a user, I can add a new recipe to the database that includes an ingredients list and directions, so that I can access it later.
6. As a user, I can edit previously created recipes so that I can make updates or fix mistakes.
7. As a user, I can delete previously created recipes so that I can keep my list up to date.
8. As a user, I would like to be able to save recipes so I can easily find and access them later.
9. As a user, I would like to search the recipe list based on type of cuisine so I can more easily find what I am looking for. 
10. As a user, I would like to search the recipe list based on meal type so I can more easily find what I am looking for. 
11. As a user, I would like to search the recipe list based on type of cuisine so I can more easily find what I am looking for. 
12. As a user, I should be able to add a recipe from the list to my meal plan so I can set up my schedule for the week.
13. As a user, I can view the current week’s planned recipes in a list so I know what to expect to cook.
14. As a user, I can navigate between each week’s meal plan views so I can look forward in time.
15. As a user, I can click to generate a static list of groceries based on recipes in the schedule for specified days or weeks up to 1 month, so I know what I need from the grocery store.
16. As a user, when I log in, I want the app to track my personal data with a secure token so that my experience can be more personalized.

## Issues we planned to address in Sprint 1

The SWErve team captures _User Stories_ and _Tasks_ as two different types of GitHub issues with those respective labels. We use using a naming convention where _User Stories_ share a prefix (i.e. `[1]`) with the _Tasks_ required to complete them. The full process is described in our [documentation](https://github.com/CEN3031-Spring2023-ProjectGroup50/SWEProject/wiki/Project-Execution-and-Organization).

### User stories planned for Sprint 1
We collectively decided to set of goal of completing **User Stories 1-3** for Sprint 1:
1. As a new visitor I want to register so I can access the features of the application.
2. As an existing visitor I want to login with username and password so I can view my account.
3. As a user I can view an existing list of recipes so that I can decide what meals to make.

### Tasks planned for Sprint 1
Some tasks for Sprint 1 user stories were created as GitHUb issues at the beginning of the sprint, while others arose throughout the sprint or near the end. The complete list is: 
1. [1] clear inputs from registration screen (closed)
2. [1] Create a function in the backend to register users (closed)
3. [1] Create a link on the main page that leads to a registration form (closed)
4. [1] Create a route for the user registration form (closed)
5. [1] Create an angular component and template for the registration form (closed)
6. [1] Generate a database for the project as a whole(closed)  
7. [1] Need to clear failed registration warning from screen if registration re-attempt is made (open)

8. [2] clear inputs from login screen (closed)
9. [2] Create a function in the backend to validate user login (closed) 
10. [2] Need to clear failed login warning from screen if login re-attempt is made (open)
11. [2] Set up home page for after login (closed) 
12. [2] Create a login form (closed)
13. [2] Route to home page upon successful login in UI (closed)
14. [2] Failure in UI for unrecognized email and invalid user/pass combos (closed)
15. [2] Warning in UI if registration email is not unique (closed)

16. [3] Backend: write search functions to get a recipe from the database (open) 

17. [5] Backend: create a POST function that allows recipe to be created in the database (open)


## Issues successfully completed in Sprint 1

We completed tasks within and outside of the planned scope during Sprint 1 as the team is finding its rhythm.

### List of completed planned issues

#### User stories
Not applicable. There are a few tasks left to fully complete the user stories we were working on in Sprint 1. For more information, see [below](#reasons-for-not-completing-these-issues).

#### Tasks
1. [1] Create a function in the backend to register users (closed)
3. [1] Create a link on the main page that leads to a registration form (closed)
4. [1] Create a route for the user registration form (closed)
5. [1] Create an angular component and template for the registration form (closed)
6. [1] Generate a database for the project as a whole (closed)  
7. [1] Warning in UI if registration email is not unique (closed)
8. [1] Failure in UI if email/pass combo is incorrect (closed)

7. [2] Create a function in the backend to validate user login (closed) 
8. [2] Create a login form (closed)
9. [2] Route to home page upon successful login (closed)
10. [2] Failure in UI if email is not recognized (closed)
11. [2] Failure in UI if login info is incorrect (closed)
12. [2] Set up a home page for after login (closed)

### List of completed unplanned issues

#### User stories
Not applicable.

#### Tasks
1. [1] clear inputs from registration screen (closed)
2. [2] clear inputs from login screen (closed)

## Issues not completed in Sprint 1

### List of planned issues not completed

#### User stories
1. As a new visitor I want to register so I can access the features of the application.
2. As an existing visitor I want to login with username and password so I can view my account.
3. As a user I can view an existing list of recipes so that I can decide what meals to make.

#### Tasks
1. [1] Route user to a home page upon successfil registration in UI (open)
2. [1] Need to clear failed registration warning from screen if registration re-attempt is made (open)

3. [2] Need to clear failed login warning from screen if login re-attempt is made (open)

### Reasons for not completing these issues
The primary reason we were not able to fully complete the above issues is that our team was still familiarizing ourselves with the platforms (GitHub, Go, Angular, etc.) and the team's process and rhythm. We sometimes veered away from the the planned user stories while exploring other capabilities. For example, in the frontend we found ourselves experimenting with overall layout and routings, but did not close on a couple user stories because of it. We feel that this has already become less of a problem as we've become more accustomed to the code base and how the team works together. 

Sprint 1 was a learning curve, but we learned several things about how to execute and communicate most effectively. During our retrospective for Sprint 1, we agreed that going forward we need to enhance our focus on user stories and align on work to be done during our Thursday sprint planning meetings. We will identify and assign all specific tasks so everyone has a clear picture of who is doing what over the next two weeks, with the end goal of completing the user stories.

## Links to sprint 1 video recordings

* [Frontend Video](https://drive.google.com/file/d/1ptBspbqTlgFEtuiU3O_UH5AH2AOHlED8/view?usp=sharing)
* [Backend Video](https://drive.google.com/file/d/1q4JdzDhl-DuVWG8Wfqf1frOeGp0PB7uv/view?usp=sharing)
