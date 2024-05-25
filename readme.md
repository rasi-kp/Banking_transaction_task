# Banking Software Project

This project is a comprehensive banking simple software system, comprising both backend and frontend components. It allows users to manage their accounts, perform transactions, and view account details. Administrators can manage user accounts, including blocking and unblocking users.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Installation](#installation)
    - [Backend](#backend)
    - [Frontend](#frontend)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Contributing](#contributing)
7. [License](#license)

![mobile (1)](https://github.com/rasi-kp/Banking_transaction_task/assets/107319917/ba531461-4837-45a5-89f2-824297faca24)

![mobile (2) (1)](https://github.com/rasi-kp/Banking_transaction_task/assets/107319917/e6dec933-d84f-44a7-b9a0-c1c3a28a131d)



## Features

- User authentication and authorization
- Account management
- Deposit and withdrawal transactions
- Available Balance
- User management (admin functionality)
- Block and unblock users

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend
- React.js
- Tailwind CSS
- Axios

## Installation

### Backend

1. **Clone the repository:**

    ```sh
    git clone https://github.com/rasi-kp/Banking_transaction_task.git
    cd Banking_transaction_task/backend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    DATABASE_URL=mongodb+srv://rasi:rafasafa@cluster0.twyt6la.mongodb.net/bank?retryWrites=true&w=majority

    JWT_SECRET='rasi_secret_key'

    JWT_SECRET_ADMIN='rasi_secret_key_admin'
    ```

4. **Run the backend server:**

    ```sh
    npm start
    ```

    The backend server should now be running on `http://localhost:3000`.

### Frontend

1. **Navigate to the frontend directory:**

    ```sh
    cd ../frontend
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Run the frontend application:**

    ```sh
    npm start
    ```

    The frontend application should now be running on `http://localhost:3001`.

## Usage

1. **Register and log in as a user.**
2. **Create and manage your bank accounts.**
3. **Perform deposit and withdrawal transactions.**
4. **View your account balance and transaction history.**
5. **Admin can manage users, including blocking and unblocking user accounts.**

## API Endpoints

### Authentication USser
- `POST /createUser`: Register a new user
- `POST /loginUser`: Log in a user

### Transaction
- `GET /transaction`: all transaction
- `POST /transaction`: new Transaction
- `GET /transaction/:id`: each transaction details
- 
### Admin
- `GET /admin/login`: Admin Login
- `GET /admin/allusers`: Get all users (admin only)
- `GET /admin/block/:id`: Block a user (admin only)
- `GET /admin/unblock/:id`: Unblock a user (admin only)

