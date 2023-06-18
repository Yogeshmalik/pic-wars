# Pic Wars

## Introduction

Pic Wars is a web application that allows users to upload and view photos. It also provides a feature to fetch and display TV shows from an API. This repository contains the source code for the Pic Wars application.

## Live Link: https://picture-wars.web.app/

## Steps

To fully experience Picture Wars, follow these steps:

Enter any random email in the format `name@g.com`  
Enter any password.  
Click on the `SIGN UP` button.  
Enter the same email and password.  
Click on the `Login` button.  
Click on the `Photos` button to access the photos uploaded to Firebase.  
Click on the `Shows` button to see the TV shows fetched from the API.

## Screenshots

<!-- Screenshots will be added here -->

![1 login picwar](https://github.com/Yogeshmalik/pic-wars/assets/14905121/deaf6c76-2ea4-4b69-961e-6e3edfddf538)  
![2 home picwar](https://github.com/Yogeshmalik/pic-wars/assets/14905121/2f85ef33-08e4-4899-b355-83129f8bfc03)  
![3 picgal picwar](https://github.com/Yogeshmalik/pic-wars/assets/14905121/36179e54-f7ff-4174-b157-05ecc93b5f0d)  
![3 1 picgal picwar](https://github.com/Yogeshmalik/pic-wars/assets/14905121/72101a93-3c19-4f2d-a0d3-cffdd2dfd61c)  
![4 show picwar](https://github.com/Yogeshmalik/pic-wars/assets/14905121/6b11e04f-c080-49ed-884a-e205a76d97b1)

## Technologies Used

React
Firebase (Authentication, Firestore, Storage)  
Axios (for API requests)  
Tailwind CSS (for styling)  
GitHub Actions (for continuous deployment)  
Firebase Hosting (for hosting the application)

## Features

User authentication (sign up, login, logout)  
Photo uploading and storage using Firebase Storage  
Displaying uploaded photos in a grid view  
Deleting photos  
Fetching TV shows from an external API  
Displaying TV shows with show details

## Installation

To run the application locally, follow these steps:

Clone the repository: `git clone https://github.com/Yogeshmalik/pic-wars.git`  
Navigate to the project directory: `cd pic-wars`  
Install the dependencies: `npm install`

Create a Firebase project and set up the Firebase configuration in the .env file:  
Copy the .env.example file and rename it to .env.  
Replace the placeholder values in the .env file with your Firebase project's configuration.

Start the development server: `npm start`  
Open the application in your browser: http://localhost:3000

## Credits

The TV show data is fetched from the TVmaze API.
The project was created and developed by Yogesh Malik.

## Conclusion

Pic Wars provides an interactive platform for users to upload and view photos as well as explore TV shows. The combination of Firebase for data storage and authentication, along with React for the frontend, creates a seamless user experience. Feel free to explore the application and share your feedback.
