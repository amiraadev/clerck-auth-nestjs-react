# NestJS React Authentication and Authorization Project with Clerk

## Overview

This project is a full-stack application that demonstrates how to implement authentication and authorization using [Clerk](https://clerk.dev/) as a third-party service. The backend is built with NestJS, and the frontend is built with React. The project supports both REST API and GraphQL strategies for handling authentication and authorization, and integrates Apollo Client for GraphQL requests.

## Features

- User authentication with Clerk.
- Authorization guards for protected routes.
- Support for both HTTP (REST) and GraphQL APIs.
- Frontend built with React, integrated with Clerk for authentication.
- Apollo Client configured for GraphQL requests.

## Prerequisites

- Node.js and npm installed.
- A Clerk account and application set up.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/amiraadev/clerck-auth-nestjs-react.git
cd nestjs-react-auth-clerk
```

### 1. Install Dependencies
#### Backend (NestJS)

```bash
cd backend
npm install
```

#### Frontend (React)
```bash
cd ../frontend
npm install
```

### 1. Environment Variables
#### Frontend 
Create a .env file in the Frontend directory and add the following variables:

```bash
VITE_CLERK_PUBLISHABLE_KEY=
```
#### Backend 
Create a .env file in the Backend directory and add the following variables:

```bash
JWT_PUBLIC_KEY=
```


This README now correctly emphasizes the usage of guards for protecting routes instead of middleware in your NestJS and React project.
