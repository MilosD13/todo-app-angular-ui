# Angular Todo Application

This is an Angular-based Todo application that includes user authentication.
Users can log in, view their todo list, add new tasks, edit existing tasks, mark tasks as complete, and delete tasks.
The application also features a logout button to end the user session.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Authentication](#authentication)
- [Features](#features)

## Installation

1. **Clone the repository**

2. **Install dependencies:**
   `npm install`

## running-the-application

1. **Start the development server:**
   `ng serve`

## Authentication

The application uses JWT (JSON Web Tokens) for authentication.
The token is stored in the browser's local storage upon successful login and is included in the Authorization header for subsequent API requests.

### Login Flow

1. User enters their username and password on the login page.
2. The credentials are sent to the `/api/authentication/token` endpoint.
3. If the credentials are valid, the server returns a JWT token.
4. The token is stored in local storage and used for future API calls.

### Logout Flow

1. The user clicks the logout button.
2. The token is removed from local storage.
3. The user is redirected to the login page.

## Features

- Login/Logout: User authentication using JWT.
- View Todos: Fetch and display a list of todos.
- Add Todo: Add new tasks to the todo list.
- Edit Todo: Edit existing tasks.
- Delete Todo: Remove tasks from the list.
- Complete Todo: Mark tasks as complete.
