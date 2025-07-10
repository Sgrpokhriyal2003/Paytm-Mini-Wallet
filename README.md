# Paytm Wallet

This is a backend application for paytm wallet where user can register and send money and recieve money by their unique userId

## Key Features:

- User Registration & Authentication (using JWT and bcrypt)
- Wallet Creation upon account registration
- Send Money to another user by user ID
- Receive Money 
- Balance Check endpoint
- Error Handling and proper HTTP response codes

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Transaction 

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sgrpokhriyal2003/Paytm-Mini-Wallet.git


# API Endpoints

## Authentication

### Sign Up
- `POST /api/`: Sign up a user
- /user/signup

### Login
- `POST /api/v1`: Login a user
- /user/signin

## Update
- `PUT /api/v1`: Update a user
- /user/update

### Get User By Search Filter
- `GET / api/v1`: Get the User By Filter
- /user/bulk

### Get Balance
- `GET /api/v1`: Get The Account Balance
- /account/balance

### Transfer Balance
- `POST /api/v1`: Transfer money to another account or user
- /account/transfer

