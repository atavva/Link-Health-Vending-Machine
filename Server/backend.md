# Documentation

## API Routes

- ### Users
- ### Programs
- ### Eligibility
- ### Contact

## Users

### <span style="color:yellow">Sign Up (In Progress)</span>

| Info             | Description                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/signup`                                                                    |
| **Method**       | `POST`                                                                                 |
| **Description**  | Signs the user up in the database (implemented) and logs the user in (not implemented) |
| **Request Info** | `email` and `password` sent in body                                                    |

#### Request

```
POST /api/users/signup
Content-Type: application/json

{
  "email": "useremail@gmail.com",
  "password": "jwu&be7^9e$5"
}
```

#### Responses

##### Success

```
Status Code: 201

{
    status: 'success'
}
```

##### Error

```
Status Code: 401

{
    status: 'fail',
    error: Supabase.AuthError
}
```

### <span style="color:yellow">Log In (In Progress)</span>

| Info             | Description                                                                           |
| ---------------- | ------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/login`                                                                    |
| **Method**       | `POST`                                                                                |
| **Description**  | Authenicates the user (implemented) and sends them a JSON Web Token (not implemented) |
| **Request Info** | `email` and `password` sent in body                                                   |

#### Request

```
POST /api/users/login
Content-Type: application/json

{
  "email": "useremail@gmail.com",
  "password": "jwu&be7^9e$5"
}
```

#### Responses

##### Success

```
Status Code: 201

{
    status: 'success'
}
```

##### Error

```
Status Code: 401

{
    status: 'fail',
    error: Supabase.AuthError
}
```

### <span style="color:yellow">Delete User (In Progress)</span>

| Info             | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| **Route**        | `/api/users`                                                                               |
| **Method**       | `DELETE`                                                                                   |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), deletes them from the database |
| **Request Info** | JWT send in header                                                                         |

#### Request

```
DELETE /api/users
Authorization: Bearer {JSON_WEB_TOKEN}
```

#### Responses

##### Success

```
Status Code: 200

{
    status: 'success'
}
```

##### Fail

```
Status Code: 401
{
    status: 'fail',
    error: TBD
}
```

### <span style="color:yellow">Update User Info (In Progress)</span>

| Info             | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users`                                                                                 |
| **Method**       | `PATCH`                                                                                      |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), updates their info (eligibility) |
| **Request Info** | JWT send in header, Body sent with patch information                                         |

#### Request

```
PATCH /api/users
Content-Type: application/json
Authorization: Bearer {JSON_WEB_TOKEN}

{
    "eligibility": {
        "agi": 85747
    }
}
```

#### Responses

##### Success

```
Status Code: 201

{
    status: 'success'
}
```

##### Fail

```
Status Code: 401 | 400
{
    status: 'fail',
    error: TBD
}
```

### <span style="color:pink">Get Personal User Info (Not Implemented)</span>

| Info             | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| **Route**        | `/api/users`                                                                 |
| **Method**       | `GET`                                                                        |
| **Description**  | Uses JWT to verify and retrieves the requesting user's decrypted information |
| **Request Info** | JWT send in header                                                           |

### <span style="color:pink">Admin Get User Info (Not Implemented)</span>

| Info             | Description                                                        |
| ---------------- | ------------------------------------------------------------------ |
| **Route**        | `/api/users/admin`                                                 |
| **Method**       | `GET`                                                              |
| **Description**  | Uses JWT to verify and retrieves information about non-admin users |
| **Request Info** | JWT send in header                                                 |

## Programs

### <span style="color:lightgreen">Get All Programs (Implemented)</span>

| Info             | Description                           |
| ---------------- | ------------------------------------- |
| **Route**        | `/api/programs`                       |
| **Method**       | `GET`                                 |
| **Description**  | Gets all the programs in the database |
| **Request Info** | None                                  |

#### Request

```
GET /api/programs
```

#### Response

```
Status Code: 200

{
    status: 'success'
    data: {
        filteredPrograms: Program[]
    }
}
```

### <span style="color:lightgreen">Get Eligible Programs (Implemented)</span>

| Info             | Description                                                     |
| ---------------- | --------------------------------------------------------------- |
| **Route**        | `/api/programs?{query}`                                         |
| **Method**       | `GET`                                                           |
| **Description**  | Gets the programs in the database that the user is eligible for |
| **Request Info** | User eligibility sent in req.query                              |

#### Request

```
GET /api/programs?agi=30000&age=70
```

#### Response

```
Status Code: 200

{
    status: 'success'
    data: {
        filteredPrograms: Program[] //Only programs where agi of 30000 and age 70 make an individual eligible
    }
}
```

### <span style="color:lightgreen">Get Program by ID (Implemented)</span>

| Info             | Description                              |
| ---------------- | ---------------------------------------- |
| **Route**        | `/api/programs/:id`                      |
| **Method**       | `GET`                                    |
| **Description**  | Gets the specified program by program ID |
| **Request Info** | Program ID sent in route (req.params)    |

#### Request

```
GET /api/programs/1
```

#### Response

```
Status Code: 200

{
    status: 'success'
    data: {
        program_id: 1,
        ...Program
    }
}
```

## Eligibility

### <span style="color:lightgreen">Determine Next Question (Implemented)</span>

| Info             | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/eligibility`                                                                                                    |
| **Method**       | `POST`                                                                                                                |
| **Description**  | Determines the best next question to ask the user given their known eligibility info and eligible/ineligible programs |
| **Request Info** | Eligible Program, Ineligible Programs, and User Eligibility send in req.body                                          |

Sending eligible and ineligible program IDs increases the efficiency of the middleware, but is not required. They can both be sent as empty lists.

#### Request

```
POST /api/eligibility
Content-Type: application/json

{
    "eligiblePrograms": [],
    "ineligiblePrograms": [],
    "eligibility": {
        "agi": 35000,
        "age": null,
        "snap": null,
        "dependents": null,
        ...fieldNames: null // The rest of the Field Names as null
    }
}
```

#### Response

```
{
    "status": "success",
    "data": {
        "questionInfo": {
            "id": 6,
            "created_at": "2023-11-11T20:04:26.739695+00:00",
            "Field Name": "age", // The field name to edit in the locally stored eligibility object
            "Question": "What is your current age?", // The question to ask the user
            "Expected Type": "Number" // The expected type (it's a number here)
        },
        "maxRemainingQuestions": 5, // How many questions are remaining at a maximum
        "percentageCompleted": 0.16666666666666666 // The minimum percentage of questions completed (for a progress bar)
    }
}
```

When maxRemainingQuestions = 0, call `GET /api/programs/{userEligibility}` to determine eligible programs - the questions have finished

#### `"Expected Type" Definitions`
| "Expected Type" | Definition |
| --- | --- |
| "Number" | We are expecting a number
| "Range a-b" | We are expecting a number in the range from a to b |
| "Boolean" | We are expecting a true or false value (yes or no) |
| "Option a\|b\|c\|d" | We are expecting one of the values as a string, separated by a \|, in this case, a, b, c, or d |
| "String" | We are expecting a string of any value |

### <span style="color:lightgreen">Get Field Names (Implemented)</span>

| Info             | Description                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/eligibility`                                                                                                    |
| **Method**       | `GET`                                                                                                                |
| **Description**  | Returns a list of user 'eligbility' field names to use in ts definitions |
| **Request Info** | None |

#### Request

```
POST /api/eligibility
```
#### Response

```
{
    "status": "success",
    "data": {
        "fieldNames": [
            "agi",
            "dependents",
            "snap",
            ...fieldNames //The rest of the field names in the DB        
        ]
    }
}
```


## Contact

### <span style="color:lightgreen">Contact Link Health (In Progress)</span>

| Info             | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| **Route**        | `/api/contact`                                                                  |
| **Method**       | `POST`                                                                          |
| **Description**  | Sends an email to Link Health with the user's email, subject, name, and message |
| **Request Info** | Info sent in req.body                                                           |

#### Request

```
POST /api/contact
Content-Type: application/json

{
    "subject": "Awesome Site!"
    "firstName": "John",
    "lastName": "Smith",
    "email": "johnsmith@gmail.com",
    "message": "I really loved the site y'all put together!"
}
```

#### Response

```
Status Code: 200

{
    status: 'success'
}
```
