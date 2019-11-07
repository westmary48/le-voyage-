This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Welcome to Le Voyage


## Application Overview
Le Voyage is a Responsive CRUD application that allows users to save all of their most recent trips and vacations in one centralized location. This application can be used as a social media platform and a scrapbook alternative. Users may view their most recent trips on their home page. They are able to see upcoming trips as well. There is a map that marks all of the places they have visited. In addition there is a countdown clock that allows users to see how far away their trip is. Users may add friends and receive friend requests. Once the friendship is developed users may see their friends trips.


## Installation Instructions
- Clone down this repo `git@github.com:westmary48/le-voyage-.git`
- At the root of the project, run `npm install`
- Create a project in Firebase
  - Add a web app to the project and enable Google authentication
  - Create a real-time database and seed it with the data from the database directory
- Create a file named `/helpers/data/apiKeys.json` and add your Firebase keys using the `apiKeys.example.json` as a template
- make sure your apiKeys are in your git ignore file

## How to Run
- In your terminal, type `npm start`

***Note**: if you want to make a production build of this project, type `npm run build`.  This will create a folder called build with all the minified code you need.*

## How to deploy
- In your terminal, type `npm run deploy`


## Application Features
- Once you login with your google email, create a few trips that you have gone on in the past
- You are able to view the single view, edit, and delete
- You can view the place you have visited the map by inputting the lat and long in the add form
- You may add upcoming trips as well
- You can use the countdown to type in the upcoming trip date
- The countdown input should look like this May 20 2020
- You can go to your friends page( you can receive friend requests, delete friends, and request friends)
- Once your friend request has been approved, you may see your friends trips at the bottom of the page( flip cards)


Inline-style:

![alt text](https://github.com/westmary48/le-voyage-/blob/master/src/components/images/home.png "Logo Title Text 1")


![alt text](https://raw.githubusercontent.com/westmary48/le-voyage-/master/src/components/images/addtrip.png "Logo Title Text 1")

![alt text](https://raw.githubusercontent.com/westmary48/le-voyage-/master/src/components/images/upcoming.png "Logo Title Text 1")

![alt text](https://raw.githubusercontent.com/westmary48/le-voyage-/master/src/components/images/countdown.png "Logo Title Text 1")

![alt text](https://raw.githubusercontent.com/westmary48/le-voyage-/master/src/components/images/friends.png "Logo Title Text 1")

![alt text](https://raw.githubusercontent.com/westmary48/le-voyage-/master/src/components/images/map.png "Logo Title Text 1")



## Have fun!!!



