# Interceptor - Master API Interface

# API Documentation
## Users
### List all users [GET]
#### Description
- Endpoint: `/v1/users/`
- Authentication: `[Admin]`

#### Request:
- Header: `{'Authorization': 'Bearer TOKEN'}`
- Params: `None`
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
