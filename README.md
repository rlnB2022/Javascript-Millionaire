# Project title
Javascript Millionaire

https://user-images.githubusercontent.com/5834000/128256119-40132fe6-28a9-46ce-85fd-90ceb2fec24b.mp4

# Project Description

This project was created to further my React knowledge using React, Firebase, and a Firestore database.
The idea behind this was it could be used to help new Javascript developers learn while playing the game.

The game has 3 lifelines:
* Ask the Audience - Each question records each answer the user gives to the database, so I can then use this data to create a bar graph representing the percentage of the audience that answered each question. It is then up to the user to choose the answer they believe is correct.
* 50:50 - Selecting this lifeline randomly removes two of the four available answers, leaving the correct answer and one other.
* Phone A Friend - This randomly choose from a choice of popular Twitter users to help them with the question. Their answers aren't always correct. Depending on the difficulty of the question, their suggestions accuracy diminishes.

There is a 30-second timer which I added as a component. It tracks the seconds in useState. When it detects that the timer is active again useEffect will trigger to reset the timer.

Unfinished To-do list:

* Once the timer runs out or the user answers incorrectly, the game over component should display.
* I would like to have a 'Share on Twitter' link.
* If a user answers all questions correctly, they should be able to either enter their name manually or login as a Twitter user to store in the database.

# Technologies Used

This project is created with:

* React - using useState and useEffect Hooks.
* Firebase - using Firestore database CRUD operations.
* HTML 5
* CSS 3 - I'm considering implementing TailwindCSS once complete.
* Javascript

# Problems Faced

I had used React before, but not Firebase/Firestorm. So, it took reading the Firestorm docs and walking through the setup process on their website.

I had an issue with too many renderings when I implement the Timer component from App.js. Instead of counting down from 30 when the game starts and the question is revealed, it began immediately. I moved the logic to the Timer component and that helped tremendously.

# What I learned

I learned that React is the library that was just made for me. I love it! I understand that TailwindCSS and React work well together so I can't wait to try that. Firestore databases are amazing. Coming from a SQL background, using a noSQL database with documents wasn't as difficult as I thought it would be.

I've learned that I get really excited when talking about React. It's the tech that I want to use in my first development job!

# Takeaways

So far, this has been a really fun project to work on. I'll be working on this throughout August, 2021.

Thanks for reading!
