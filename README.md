# Javascript Millionaire

https://user-images.githubusercontent.com/5834000/134794913-abec9501-9965-4ebe-9335-ac65ccfd3f08.mp4

# Project Description

I created this project in 2021 to further my React knowledge using React 17, Firebase, useState/useEffect hooks and a Firestore database. I thought that this would be a fun project to create and that I could use this app to help new Javascript developers learn Javascript while playing the game.

Now, after being employed as a React Software Engineer for an amazing company, I have revisited this project to apply a lot of what I have learned. One, was implementing React Redux to manage state.

The game has 3 lifelines:
* Ask the Audience - Each question records each answer the user selects to the database, so I can then use this data to create a bar graph representing the percentage of the audience that answered each question. It is then up to the user to choose the answer they believe is correct
* 50:50 - Selecting this lifeline RANDOMLY removes two of the four available answers, leaving the correct answer and one other
* Phone A Friend - This randomly chooses from a selection of 'friends' to help them with the question. Their answers aren't always correct. Depending on the difficulty of the question, their suggestion accuracy diminishes

# Technologies Used

This project is created with:

* React 17 - useState and useEffect Hooks
* Redux - Maintaining state globally in a store
* Firebase - Firestore database CRUD operations
* HTML 5
* CSS 3
* Javascript

# Process

* I love a good challenge. So, when I needed a way to store the questions and answers in a database, I welcomed the opportunity to explore and experiment with Firebase/Firestore.

* Reading through the Firestore docs and reviewing the setup procedure on their website proved to be fairly straightforward.

* Encountering excessive renderings became an issue when implementing the Timer component from App.js. Rather than initiating a countdown from 30 when the game starts and the question is revealed, it began immediately. Shifting the logic to the Timer component made a significant improvement in performance.

# What I learned

Firestore databases are amazing. Coming from a SQL background, a noSQL database with documents wasn’t as difficult as I initially anticipated. This was the first project where I learned how to implement React Redux to manage the state of the app. Given my work-experience with Flux, adapting and learning was a relatively smooth transition.

Thanks for reading!
