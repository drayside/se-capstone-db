# API Documentation
## 1. Users
### 1.1 List all users: [GET] `/v1/users/`
#### Description
Gets all the users. Only accepts admin tokens.
- Endpoint: `/v1/users/`
- Authentication: `[Admin]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    users: [
        {
            "id": [INTEGER],
            "name": [STRING],
            "email": [STRING],
            "updatedAt": [STRING],
            "createdAt": [STRING]
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 1.2 View a user: [GET] `/v1/user/:id`
#### Description
Get the user with the specified `id`.
- Endpoint: `/v1/user/:id`
    - `id`: identification for the target user.
- Authentication: `[Admin, User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    "id": [INTEGER],
    "name": [STRING],
    "email": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`
-
### 1.3 View a user: [POST] `/v1/user/create`
#### Description
Creates a new user.
- Endpoint: `/v1/user/create`
- Authentication: `[Admin]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body:
```javascript
{
    "first_name": [STRING],
    "last_name": [STRING],
    "email": [STRING],
    "username": [STRING],
    "password": [STRING],
}
```

#### Response:
```javascript
{
    "id": [INTEGER],
    "first_name": [STRING],
    "last_name": [STRING],
    "email": [STRING],
    "username": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{201: 'Created'}`
- Error Code: `{403: 'Forbidden', 409: 'ConflictError'}`
