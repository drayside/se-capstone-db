# API Documentation
## 1. Users
### 1.1 List all projects: [GET] `/project/all`
#### Description
Returns a list of all projects.
Includes: Name, Project ID, Year, Abstract.
- Endpoint: `/project/all/`

#### Request:
- Header: `{}`
- Body: `{}`

#### Response:
```javascript
{
    projects: [
        {
            "name": [STRING],
            "year": [STRING],
            "abstract": [STRING],
            "pid": [INT],
            "program": [STRING]
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{404: 'NotFoundError'}`

### 1.2 Get single project information: [GET] `/project/:id`
#### Description
Get project details for the specified project id.
- Endpoint: `/project/:id`
    - <id> : identification for the target user.

#### Request:
- Header: `{}`
- Body: `{}`

#### Response:
```javascript
{
    "id": [INTEGER],
    "name": [STRING],
    "students": [STRING],
    "year" : [INTEGER],
    "status" : [STRING],
    "tags" : [STRING],
    "abstract" : [STRING],
    "external_partners" : [STRING],
    "program": [STRING]
}
```
#### Response Status Codes:
- Success Code: `{200: 'Success'}`
- Error Code: `{404: 'NotFoundError'}`

### 2.1 Search based on filters: [POST] `/search`
#### Description
Searches for projects based on different filters.
For now, the API supports searching by name, status, tags and year.
- Endpoint: `/search`

#### Request:
- Header: `{}`
- Body:
```javascript
{
    "name": [STRING],
    "status": [STRING],
    "tags": [STRING],
    "year": [STRING]
}
```

#### Response:
```javascript
{
    projects: [
        {
            "name": [STRING],
            "year": [STRING],
            "abstract": [STRING],
            "pid": [INT],
            "program": [STRING]
        },
    ]
}
```
#### Response Status Codes:
- Success Code: `{201: 'SearchCompleted'}`
- Error Code: `{400: 'BadRequest'}`
