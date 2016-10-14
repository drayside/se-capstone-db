# API Documentation

server.get('/v1/user/:id', userHandlers.view); // User route: get user by the id
server.post('/v1/user/create/', userHandlers.createUser); // User route: create a user
server.del('/v1/user/delete/:id', userHandlers.del); // User route: create a user

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
