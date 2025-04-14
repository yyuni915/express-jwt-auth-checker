# Express JWT Auth Checker

A minimal Express.js application demonstrating JWT-based authentication with middleware and optional database connection check.

## Features

- JSON Web Token (JWT) authentication
- `/signin` route issues a token upon valid login
- `/status` route is protected by middleware and returns login status
- Environment variable configuration with `.env` support
- CORS enabled for cross-origin access
- Simple structure to extend with your own logic

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yyuni915/express-jwt-auth-checker.git
cd express-jwt-auth-checker/server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a .env file 
```bash
cp .env.example .env
```

Edit .env and set your custom credentials:
```env
ADMIN_USER=guest
ADMIN_PASS=1234
PORT=3000
JWT_SECRET=yourSuperSecretKey
```

### 4. Run the server 
```bash
node app.js
```

### API Endpoints

### 1. POST /signin
Authenticate user and receive a JWT token.
Request:
```bash
curl -X POST http://localhost:3000/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"guest","password":"1234"}'
```

Response:
```text
<JWT Token>
```

### 2. GET /status
Check if the token is valid and whether the server is connected to the database.

Request:
```bash
curl http://localhost:3000/status \
  -H "Authorization: Bearer <Your JWT Token>"
```

Response:
```json
{
  "isLogin": true,
  "isConnectedToDatabase": false
}
```
isConnectedToDatabase always returns false unless connected to a real database.

### Project Structure
```bash
server/
├── app.js
├── middleware/
│   └── token.js
├── db/
│   └── connection.js (optional)
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

### Notes
This project is meant for learning/demo purposes. In production, make sure to:

- Use HTTPS
- Set strong secrets and store them securely
- Implement token expiration and refresh flow
- Use a real database

### Author
Yuni Yoon
