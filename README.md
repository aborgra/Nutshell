# React- Nutshell

Nutshell is a social application designed for sloth enthusiasts.

## Installation

Install react packages:

```bash
npx create-react-app 
npm i --save react-router-dom
npm install --save bootstrap
npm install --save reactstrap react react-dom

npm start from the root directory to run application
```



## Features / Functionality
1. Login/register as a new user
1. Add/remove friends
1. Add/edit/remove tasks
1. Add/edit/remove news
1. Add/edit/remove events
1. Send receive public messages and edit yours
1. Add friends from search or messages section
1. View news and events of friends/self in chronological order
1. Stay logged in on page refresh
1. Logout
1. Confirm password and username for security
1. Mark tasks as complete

## Database sample
Run a json server watching database.json on port 8088

```JSON
{
  "users": [
    {
      "id": 1,
      "userName": "Steve",
      "email": "steve@me.com",
      "password": "123"
    },
    {
      "id": 2,
      "userName": "Mo",
      "email": "mo@me.com",
      "password": "123"
    },
    {
      "id": 3,
      "userName": "Leah",
      "email": "leah@me.com",
      "password": "123"
    }
  ],
  "news": [
    {
      "title": "Steve",
      "date": "Fri. Jan. 31 2020 11:16 AM",
      "userId": 1,
      "id": 1
    }
  ],
  "events": [
    {
      "userId": 6,
      "name": "My mom's making dinner",
      "date": "Fri Jan 01 2021 16:30:00 GMT-0600 (Central Standard Time)",
      "location": "My house",
      "id": 10
    }
  ],
  "tasks": [
    {
      "userId": 1,
      "name": "Present my findings",
      "completionDate": "2020-01-25",
      "id": 7,
      "isCompleted": true
    }
   
  ],
  "messages": [
    {
      "id": 1,
      "message": "What's up?",
      "userId": 1
    }
   
  ],
  "friends": [
    {
      "userId": 3,
      "friendInitiateId": 4,
      "active": true,
      "id": 12
    },
    {
      "friendInitiateId": 4,
      "userId": 1,
      "active": true,
      "id": 13
    }
  ]
}

```

## Authors
Onterio Wright
Audrey Borgra
William Green
James Nitz

## Thank You's
[NSS](http://nashvillesoftwareschool.com/)