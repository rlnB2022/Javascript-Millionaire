# Javascript Millionaire

https://user-images.githubusercontent.com/5834000/134794913-abec9501-9965-4ebe-9335-ac65ccfd3f08.mp4

# Project Description

I created this project in 2021 to further my React knowledge using React 17, Firebase, useState/useEffect hooks and a Firestore database. I thought that this would be a fun project to create and that I could use this app to help new Javascript developers learn Javascript while playing the game.

Now, after being employed as a React Software Engineer for a company, I have revisited this project to apply a lot of what I have learned. One, was implementing React Redux to manage state.

## How to Play
The game has 3 lifelines:
* Ask the Audience - Each question records each answer the user gives to the database, so I can then use this data to create a bar graph representing the percentage of the audience that answered each question. It is then up to the user to choose the answer they believe is correct.
* 50:50 - Selecting this lifeline randomly removes two of the four available answers, leaving the correct answer and one other.
* Phone A Friend - This randomly choose from a choice of popular Twitter users to help them with the question. Their answers aren't always correct. Depending on the difficulty of the question, their suggestions accuracy diminishes.

There is a 30-second timer which I added as a component. It tracks the seconds in useState. When it detects that the timer is active again useEffect will trigger to reset the timer.

# Technologies Used

This project is created with:

* React 17 - using useState and useEffect Hooks.
* Redux - Maintaining state globally in a store
* Firebase - using Firestore database CRUD operations.
* HTML 5
* CSS 3
* Javascript

# Problems Faced

I had used React before, but not Firebase/Firestorm. So, it took reading the Firestorm docs and walking through the setup process on their website.

I had an issue with too many renderings when I implement the Timer component from App.js. Instead of counting down from 30 when the game starts and the question is revealed, it began immediately. I moved the logic to the Timer component and that helped tremendously.

I used SVG images for each question/answer. I ran into a problem where the SVGs wouldn't resize to fit the grid. I replaced the SVGs with simple borders/border-radius styles applied. I understand that the viewbox setting in the SVG might be the culprit. I'll have to learn more about using SVGs to understand how to implement something like this in the future.

# What I learned

I learned that React is the library that was just made for me. I love it! I understand that TailwindCSS and React work well together so I can't wait to try that. Firestore databases are amazing. Coming from a SQL background, using a noSQL database with documents wasn't as difficult as I thought it would be.

I've learned that I get really excited when talking about React. It's the tech that I want to use in my first development job!

# Takeaways

So far, this has been a really fun project to work on. I finished working on this project September 26, 2021...late into the night. Deployed on Github Pages.

Thanks for reading!
