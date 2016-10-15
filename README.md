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

### 1.4 View a user: [DEL] `/v1/user/delete/:id`
#### Description
Deletes the user with the given `id`.
- Endpoint: `/v1/user/delete/:id`
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Params: `id` of the user to be deleted.
- Body: `{}`

#### Response:
- body: `{}`
#### Response Status Codes:
- Success Code: `{204: 'NoContent'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`

## 2. Lists
### 2.1 List all lists for a given user: [GET] `/v1/user/:userId/lists/`
#### Description
Gets all the users. Only accepts admin tokens.
- Endpoint: `/v1/user/:userId/lists/`
    -- `userId` is the id of the user whose lists are being requested
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    list: [
        {
            "id": [INTEGER],
            "name": [STRING],
            "description": [STRING],
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden'}`

### 2.2 View a user: [GET] `/v1/user/:userId/list/:listId`
#### Description
Get the user with the specified `id`.
- Endpoint: `/v1/user/:userId/list/:listId`
    - `userId`: identification for the target user.
    - `listId`: identification for the target list.
- Authentication: `[Admin, User]`
    - `token`: User token must be the one assigned to the target user or an admin token.

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body: `{}`

#### Response:
```javascript
{
    "id": [INTEGER],
    "description": [STRING],
    "items": [
        {
            "id": [INTEGER],
            "name": [STRING],
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`

### 2.3 Create a list: [POST] `/v1/user/:userId/list/create`
#### Description
Creates a new user.
- Endpoint: `/v1/user/:userId/list/create`
    - `userId`: identification for the target user.
- Authentication: `[Admin]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Body:
```javascript
{
    "name": [STRING],
    "description": [STRING],
}
```

#### Response:
```javascript
{
    "id": [INTEGER],
    "name": [STRING],
    "description": [STRING],
    "updatedAt": [STRING],
    "createdAt": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{201: 'Created'}`
- Error Code: `{403: 'Forbidden', 409: 'ConflictError'}`

### 2.4 View a user: [DEL] `/v1/user/:userId/list/:listId`
#### Description
Deletes the list with the given `id`.
- Endpoint: `/v1/user/:userId/list/:listId`
    - `userId`: identification for the target user.
    - `listId`: identification for the target list.
- Authentication: `[Admin, User]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Params: `id` of the user to be deleted.
- Body: `{}`

#### Response:
- body: `{}`
#### Response Status Codes:
- Success Code: `{204: 'NoContent'}`
- Error Code: `{403: 'Forbidden', 404: 'NotFoundError'}`
