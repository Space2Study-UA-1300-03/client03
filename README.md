<a href="https://softserve.academy/"><img src="../main/photo2.jpg" title="SoftServe IT Academy" alt="SoftServe IT Academy"></a>

# SpaceToStudy project

**SpaceToStudy** is a platform where experts in various fields share their knowledge, and students get access to high-quality courses and learning experiences. This repository contains the frontend part of the project, built with React, Redux, and Material-UI.

---

## Table of Contents

- [Installation](#installation)
  - [Requirements](#requirements)
  - [Clone Repository](#clone-repository)
  - [Setup](#setup)
  - [Running Locally](#running-locally)
- [Usage](#usage)
  - [Running Tests](#running-tests)
- [Documentation](#documentation)
  - [Project Structure and Coding Guidelines](#project-structure-and-coding-guidelines)
  - [Testing](#testing)
- [Implemented on the Frontend](#implemented-on-the-frontend)
  - [Popular Categories, Subjects, and Offers](#popular-categories-subjects-and-offers)
  - [Registration and Login](#registration-and-login)
  - [Profile Setup Stepper](#profile-setup-stepper)
  - [Forms for Creating Offers and Requests](#forms-for-creating-offers-and-requests)
  - [Search, Filtering, and Pagination](#search-filtering-and-pagination)
  - [Multilingual Support](#multilingual-support)
- [Teams](#teams)
- [FAQ](#faq)
- [License](#license)

---

## Installation

### Requirements

- NodeJS (version **18.14.0 LTS** or above)
- NPM

### Clone Repository

Clone this repository to your local machine:

### Setup

> install npm packages

```shell
$ npm install
```

### How to run local

1. Open terminal.
2. Run `npm run start` to start application.<sup>[*](#footnote)</sup>
3. Open http://localhost:3000 to view it in the browser.

###### <a name="footnote">*</a> - to run the project you need an `.env` file in root folder


## Usage

### How to run tests

To run unit test open terminal and run `npm run test` in it.

---

## Documentation

### Rules and guidelines

- Redux
  - For each entity we should have separate folder
  - In each folder we should have different files for actions, reducer
    `{modelName}.actions.js` or `{modelName}.reducer.js`
- Configuration
  - Configuration is done via `.env` file where environment
    variables are located
- Styles
  - For styling function `makeStyles` from `@material-ui`
    should be used and all styles should be located inside separate
    component.
- Components
  - Components that are connected to Redux should be located inside
    `containers` folder. Components without connection to Redux should
    be located inside `components` folder.
  - Each individual page that is accessed via `react-router`
    should be located inside `pages` folder. All components
    that are used inside particular page should be located inside
    folder for the specific page.
  - Each component should have at least three files:
    - `index.js` where we export anything from the whole folder
    - `{component-name}.jsx` - file where component is located
    - `{component-name}.styles.js` where all styles are located

### Testing

#### Components

Order of testing components:

1. simple stateless components that are used in multiple places
2. components that depends on other components but not connected to Redux and don’t have any state
3. components that have internal state but are not connected to Redux
4. components that connected to Redux

##### Don’t test:

- third-party libraries
- constants
- static css styles
- related components (test only one specific component at the specific moment of time)

##### How to test:
- testing using snapshots (actual ui)
- testing logic of component (dynamic)

Snapshots allow us to compare actual UI with saved one and throw an error if it has accidentally changed. We can use flag “updateSnapshot” to update save snapshots of a component.
It is appropriate for presentational components but doesn’t cover any logic

##### What to test in components:

- Properties
- default properties
- custom properties
- Data types (use library “jest-extended”)
- Conditions (what if)
- State
- default state
- state after some event has happened
- Events
- with parameters or custom props
- without arguments

#### Sagas

Flow:

- Set up the conditions of our test
- Mock the actual HTTP requests
- Instruct the saga to run through everything and finish its business
- Check that the expected side effects have happened (actions are dispatched, selectors are called, etc)

Link to the full article about proper saga testing: https://dev.to/phil/the-best-way-to-test-redux-sagas-4hib#:~:text=To%20test%20that%20the%20saga,selector%20into%20the%20following%20gen.

#### Actions creators

We test action creators as simple pure functions that just take an arguments and output proper arguments

#### Reducers

We test reducers as simple pure functions that just take an arguments and output proper arguments
Checks:

- valid default state
- changes of state when action is dispatched for different values of state

#### Cypress

1. Use `data-cy` as selector

---

## Implemented on the Frontend

### Popular Categories, Subjects, and Offers
- A **Popular Categories** block on the homepage shows the most in-demand tutoring areas (e.g., Chemistry, History, Painting, etc.).
- Users can click on a category to view the **Subjects** within that category.
- Each **Subject** page displays available offers or requests. This includes the tutor’s information (price, level, languages, etc.) or students’ requests.
- **Search and filtering** options are available on every page with a list of categories or subjects, allowing users to quickly find the most relevant offers.

### Registration and Login
- Developed forms for registration (both for students and tutors) with Google Sign-In integration and data validation.
- Implemented automatic pre-filling of first and last name from the Google profile.

### Profile Setup Stepper
- Created a multi-step form for profile setup after successful registration.
- Includes entering basic information, selecting subjects, choosing languages, and uploading a profile photo.

### Forms for Creating Offers and Requests
- **Create a New Offer** form for tutors:
  - Choose a category, subject, and proficiency level.
  - Describe teaching approach, specify lesson price, choose the teaching language, and add FAQ.
  - Publish the offer immediately or save it as a draft.
- **Learning Requests** form for students:
  - Specify subject, proficiency level, preferred schedule, and other requirements.

### Search, Filtering, and Pagination
- Developed components for keyword search, filtering by category, language, price, and proficiency level.
- Implemented pagination to enable smooth navigation through long lists of offers or requests.
- Each page containing lists of categories, subjects, or offers includes search and filter options for an optimal user experience.

### Multilingual Support
- Integrated a language switcher (English/Українська) to accommodate a wider audience.


## Contributing

You're encouraged to contribute to our project if you've found any issues or missing functionality that you would want to see. You can add in **Issues** tab and after that click on `New issue`. There you can see the list of issues and create a new issue after clicking on `New Issue`.

Before sending any pull request, please discuss requirements/changes to be implemented using an existing issue or by creating a new one. All pull requests should be done into `develop` branch.

There are two GitHub projects: **Space2Study-node-Client-mvp** for frontend part and **Space2Study-node-BackEnd-mvp** for backend part. Every project has it's own issues.

Every pull request should be linked to an issue. So if you make changes on frontend or backend parts you should create an issue with a link to corresponding requirement (story, task or epic). Every issue should have its own branch. Every branch name should start from task type (`feature`, `bugfix` or `test`), task number and short description. e.g. **feature/125/create-adminPanel**

All Pull Requests should start from prefix `#xxx-yyy` where xxx - task number and and yyy - short description e.g. **#125-createAdminPanel**

---

### Git flow

We have **main** , **develop** and **feature** branches.  
All **feature** branches must be merged into `develop` branch!!!
Only the release should merge into the main branch!!!

![Github flow](<https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=1312>)

#### Step 1

- **Option 1**

  - 👯 clone this repo to your local machine

- **Option 2**

  - create new branch from development branch

#### Step 2

- add some commits to your new branch

#### Step 3

- 🔃 create a new pull request in this repository

---

### Issue flow

#### Step 1

- go to **Issues** and click `New issue` button

#### Step 2

- when creating issue you should add name of the issue, description, choose assignee, label, project. If issue is a `User Story` you should link it with corresponding tasks, and corresponding tasks should be linked to issue.

#### Step 3

- if issue is in work it should be placed in proper column on dashboard according to its status.

---

## Teams

### Development team

[![@NataliaKilienko](https://avatars.githubusercontent.com/NataliaKilienko?v=4)](https://github.com/NataliaKilienko)
[![@IrynaKhylchuk](https://avatars.githubusercontent.com/IrynaKhylchuk?v=4)](https://github.com/IrynaKhylchuk)
[![@uncle-Yevhenii](https://avatars.githubusercontent.com/uncle-Yevhenii?v=4)](https://github.com/uncle-Yevhenii)
[![@SanekOstapiuk](https://avatars.githubusercontent.com/SanekOstapiuk?v=4)](https://github.com/SanekOstapiuk)
[![@bilets](https://avatars.githubusercontent.com/bilets?v=4)](https://github.com/bilets)
[![@ANNA124kr](https://avatars.githubusercontent.com/ANNA124kr?v=4)](https://github.com/ANNA124kr)


## FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just do this.

---

#### License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.

[MIT](https://choosealicense.com/licenses/mit/)

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
