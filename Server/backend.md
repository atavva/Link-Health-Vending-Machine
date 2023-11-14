# Documentation

## API Routes

- ### Users
- ### Programs
- ### Eligibility
- ### Contact

## Users

### <span style="color:lightgreen">Sign Up (Implemented)</span>

| Info             | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **Route**        | `/api/users/signup`                                                      |
| **Method**       | `POST`                                                                   |
| **Description**  | Signs the user up in the database and logs the user in via JWT in cookie |
| **Request Info** | `email` and `password` sent in body                                      |

#### Request

```
POST /api/users/signup
Content-Type: application/json

{
  "email": "useremail@gmail.com",
  "password": "jwu&be7^9e$5",
  "firstName"?,
  "lastName"?,
  "eligibilty"?,
  "eligiblePrograms"?,
  "registeredPrograms"?
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

### <span style="color:lightgreen">Log In (Implemented)</span>

| Info             | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| **Route**        | `/api/users/login`                                               |
| **Method**       | `POST`                                                           |
| **Description**  | Authenicates the user and sends them a JSON Web Token via cookie |
| **Request Info** | `email` and `password` sent in body                              |

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

### <span style="color:lightgreen">Delete User (Implemented)</span>

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
    status: 'success',
    message: 'User successfully deleted'
}
```

##### Fail

```
Status Code: 500
{
    status: 'fail',
    error: "Internal Server Error"
}
```

### <span style="color:lightgreen">Update Eligibility (Implemented)</span>

| Info             | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/eligibility`                                                                     |
| **Method**       | `PATCH`                                                                                      |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), updates their info (eligibility) |
| **Request Info** | JWT sent in header, Body sent with an updated eligibility object                             |

#### Request

```
PATCH /api/users/eligibility
Authorization: Bearer ${jwt}

{
    "eligibility": {
        "agi": 23000
    }
}
```

#### Response

```
Status Code: 201

{ // The updated user eligibility object
    "status": "success",
    "data": {
        "eligibility": {
            "age": 24,
            "agi": 23000,
            "dependents": 3
        }
    }
}
```

Optionally, you can use this method to remove data, as "deleted" fields are stored as null values:

#### Request

```
PATCH /api/users/eligibility
Authorization: Bearer ${jwt}

{
    "eligibility": {
        "dependents": null
    }
}
```

#### Response

```
Status Code: 201

{ // The updated user eligibility object
    "status": "success",
    "data": {
        "eligibility": {
            "age": 24,
            "agi": 23000,
            "dependents": null
        }
    }
}
```

### <span style="color:lightgreen">Update Eligible Programs (Implemented)</span>

| Info             | Description                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/eligible-programs`                                                                       |
| **Method**       | `PATCH`                                                                                              |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), updates their info (registered programs) |
| **Request Info** | JWT send in header, Body sent with a list of eligibel program IDs object                             |

#### Request

```
PATCH /api/users/eligible-programs
Authorization: Bearer ${jwt}

{
    "eligiblePrograms": [2, 3] //A list of eligible programs - will add ones that are not already in user's eligible_programs
}
```

#### Response

```
Status Code: 201

{ // The updated list of eligible programs
    "status": "success",
    "data": {
        "eligible_programs": [
            "1",
            "6",
            "4",
            "2",
            "3"
        ]
    }
}
```

### <span style="color:lightgreen">Update Registered Programs (Implemented)</span>

| Info             | Description                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/registered-programs`                                                                     |
| **Method**       | `PATCH`                                                                                              |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), updates their info (registered programs) |
| **Request Info** | JWT send in header, Body sent with a list of registered program IDs object                           |

#### Request

```
PATCH /api/users/registered-programs
Authorization: Bearer ${jwt}

{
    "registeredPrograms": [1, 3] //A list of programs which the user has already registered for
}
```

#### Response

```
Status Code: 201

{ // The updated list of registered programs
    "status": "success",
    "data": {
        "registered_programs": [
            "5",
            "3",
            "1"
        ]
    }
}
```

### <span style="color:lightgreen">Delete Eligibility (Implemented)</span>

| Info             | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/eligibility`                                                                                   |
| **Method**       | `DELETE`                                                                                                   |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), deletes their selected info (eligibility)      |
| **Request Info** | JWT send in header, Body sent with an list of eligibility field names to delete (nulls values in database) |

#### Request

```
DELETE /api/users/eligibility
Authorization: Bearer ${jwt}

{
    "eligibility": ["agi"] // A list of field names to delete (nullify)
}
```

#### Response

```
Status Code: 200

{ // The updated user eligibility
    "status": "success",
    "data": {
        "eligibility": {
            "age": 24,
            "agi": null,
            "dependents": 3
        }
    }
}
```

### <span style="color:lightgreen">Delete Eligible Programs (Implemented)</span>

| Info             | Description                                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/eligible-programs`                                                                              |
| **Method**       | `DELETE`                                                                                                    |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), deletes their selected info (eligible programs) |
| **Request Info** | JWT send in header, Body sent with an list of program IDs to delete                                         |

#### Request

```
DELETE /api/users/eligible-programs
Authorization: Bearer ${jwt}

{
    "eligibilePrograms": [2] // A list of program IDs to remove from the user's eligible programs
}
```

#### Response

```
Status Code: 200

{ // The updated eligible program list
    "status": "success",
    "data": {
        "eligible_programs": [
            "1",
            "6",
            "4",
            "3"
        ]
    }
}
```

### <span style="color:lightgreen">Delete Registered Programs (Implemented)</span>

| Info             | Description                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/registered-programs`                                                                              |
| **Method**       | `DELETE`                                                                                                      |
| **Description**  | Uses JWT to verify user and (after front-end confirmation), deletes their selected info (registered programs) |
| **Request Info** | JWT send in header, Body sent with an list of program IDs to delete                                           |

#### Request

```
DELETE /api/users/registered-programs
Authorization: Bearer ${jwt}

{
    "eligibilePrograms": [2] // A list of program IDs to remove from the user's eligible programs
}
```

#### Response

```
Status Code: 200

{ // The updated registered programs list
    "status": "success",
    "data": {
        "registered_programs": [
            "5",
            "3",
            "1"
        ]
    }
}
```

### <span style="color:lightgreen">Get Personal User Info (Implemented)</span>

| Info             | Description                                                                  |
| ---------------- | ---------------------------------------------------------------------------- |
| **Route**        | `/api/users`                                                                 |
| **Method**       | `GET`                                                                        |
| **Description**  | Uses JWT to verify and retrieves the requesting user's decrypted information |
| **Request Info** | JWT sent in header                                                           |

#### Request

```
GET /api/users
Authorization: Bearer ${jwt}
```

#### Response

```
Status Code: 200

{
    "status": "success",
    "data": [
        {
            "id": "c2e4c48a-d882-4bb4-84df-34b42d0302b8",
            "role": "admin",
            "eligibility": {
                "age": 24,
                "agi": null,
                "dependents": 3
            },
            "first_name": null,
            "last_name": null,
            "user_id": "c2e4c48a-d882-4bb4-84df-34b42d0302b8",
            "eligible_programs": [
                "1",
                "6",
                "4",
                "3"
            ],
            "registered_programs": [
                "5",
                "3",
                "1"
            ],
            "email": "nabji@berkeley.edu"
        }
    ]
}
```

### <span style="color:lightgreen">Admin Get All User Info (Implemented)</span>

| Info             | Description                                                                                                       |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Route**        | `/api/users/admin`                                                                                                |
| **Method**       | `GET`                                                                                                             |
| **Description**  | Uses JWT to verify and retrieves information about non-admin users (it will return a forbiddenError if not admin) |
| **Request Info** | JWT sent in header                                                                                                |

#### Request

```
GET /api/users/admin
Authorization: Bearer ${jwt}
```

#### Response

```
Status Code: 200

{
    "status": "success",
    "data": [
        {
            "id": "64e38c62-a16c-4013-99b9-ed84002732f6",
            "role": "user",
            "eligibility": {
                "age": 70,
                "agi": 14000,
                "dependents": 5
            },
            "first_name": null,
            "last_name": null,
            "user_id": "64e38c62-a16c-4013-99b9-ed84002732f6",
            "eligible_programs": [
                "1",
                "8",
                "4"
            ],
            "registered_programs": [
                "1"
            ],
            "email": "na933950@berkeley.edu"
        },
        {
            "id": "1874d534-e744-40b4-99bc-6325ecc55f5a",
            "role": "user",
            "eligibility": {},
            "first_name": "",
            "last_name": "",
            "user_id": "1874d534-e744-40b4-99bc-6325ecc55f5a",
            "eligible_programs": [],
            "registered_programs": [],
            "email": "obiwan@kenobi.com"
        },
        {
            "id": "b98e96ab-c442-44b3-8019-7cf7cf8a167c",
            "role": "user",
            "eligibility": {},
            "first_name": "Obiwana",
            "last_name": "Kenobia",
            "user_id": "b98e96ab-c442-44b3-8019-7cf7cf8a167c",
            "eligible_programs": [],
            "registered_programs": [],
            "email": "obiwana@kenodbi.com"
        },
        {
            "id": "47cc0d5b-1d11-48cd-a084-b41756a0942c",
            "role": "user",
            "eligibility": {},
            "first_name": "ste",
            "last_name": "ste",
            "user_id": "47cc0d5b-1d11-48cd-a084-b41756a0942c",
            "eligible_programs": [],
            "registered_programs": [],
            "email": "seta#A#@asdf"
        },
        {
            "id": "33d2aa7a-0ee5-42ef-ad24-fb8fe5feb8eb",
            "role": "user",
            "eligibility": {},
            "first_name": "sadf",
            "last_name": "asdf",
            "user_id": "33d2aa7a-0ee5-42ef-ad24-fb8fe5feb8eb",
            "eligible_programs": [],
            "registered_programs": [],
            "email": "asdf#@asdf"
        }
    ]
}
```

### <span style="color:lightgreen">Admin: Update User Registered Programs (Implemented)</span>

| Info             | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Route**        | `/api/users/admin/:id`                                                                                       |
| **Method**       | `PATCH`                                                                                                      |
| **Description**  | Uses JWT to verify and updates a user's registered programs (if an admin has registered them)                |
| **Request Info** | JWT sent in header, req.params contains a user ID to update, req.body contains a list of registered programs |

#### Request

```
PATCH /api/users/admin/64e38c62-a16c-4013-99b9-ed84002732f6
Authorization: Bearer ${jwt}

{
    "registeredPrograms": [1]
}
```

#### Response

```
Status Code: 201

{
    "status": "success",
    "data": {
        "registered_programs": [
            "1"
        ]
    }
}
```

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

| "Expected Type"     | Definition                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------- |
| "Number"            | We are expecting a number                                                                      |
| "Range a-b"         | We are expecting a number in the range from a to b                                             |
| "Boolean"           | We are expecting a true or false value (yes or no)                                             |
| "Option a\|b\|c\|d" | We are expecting one of the values as a string, separated by a \|, in this case, a, b, c, or d |
| "String"            | We are expecting a string of any value                                                         |

### <span style="color:lightgreen">Get Field Names (Implemented)</span>

| Info             | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| **Route**        | `/api/eligibility`                                                       |
| **Method**       | `GET`                                                                    |
| **Description**  | Returns an empty user eligibilty object with all field names set to null |
| **Request Info** | None                                                                     |

#### Request

```
GET /api/eligibility
```

```
Status Code: 200

{
    "status": "success",
    "data": {
        "eligibility": {
            "agi": null,
            "dependents": null,
            "snap": null,
            "poverty_level": null,
            "filing_status": null,
            "age": null
        }
    }
}
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

## Auth Errors

#### Authentication Error

Sent when no JWT is sent to the server - the user is not logged in

```
Status Code: 401

{
    status: "fail",
    error: "authenticationError",
    message: "Authentication is required. Please sign in to access this resource",
}
```

#### Expired Session Error

Sent when the user's session has expired - the user needs to log in again

```
Status Code: 401

{
    status: "fail",
    error: "expiredSessionError",
    message: "Your session has expired. Please log in again to access this resource",
}
```

#### Invalid Session Error

Sent when the user's JWT is invalid and could not be verified by the server - the user needs to log in again

```
Status Code: 401

{
    status: "fail",
    error: "invalidSessionError",
    message:"Your session is invalid. Please log in again to access this resource",
}
```

#### Forbidden Route Error

Sent when a normal user tries to access an admin-protected route

```
Status Code: 403
{
    status: 'fail',
    error: 'forbiddenRouteError',
    message: "You must be an administrator to access this resource",
}
```
