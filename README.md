# Time for Teachers 

<img src="./readme-images/main-landing.png" alt="Landing Page for 'Time for Teachers' app">

## About

"Time for Teachers" is a MERN stack web application that helps teachers track the time they are spending on required tasks and compare that with how much planning/contractual time they are allotted.

Check out the app [here](https://timeforteachers.us). 

## Technologies Used

- React 
- Reactstrap, CSS & SCSS 
- JavaScript
- Moment.js
- Node.js
- Express
- AWS (S3, CloudFront, Route53, Elastic Beanstalk, Cognito, Lambda)
- Mongoose 
- MongoDB Atlas
- MongoDB Charts 

## How it Works 

<img src="./readme-images/description-landing.png" alt="Description on landing page for 'Time for Teachers' app">

Each day teachers may log in and track the time they are spending on required tasks, which are broken down into common categories (grading, lesson planning, planning/organizing special events, continuing education/mandatory trainings, communication, and legal paperwork), on their dashboard. They can choose to use timers or manually input their time for each category. They may also manually input how much planning time they received that day on the left-hand side. Once they have begun logging times, they will see the planning time they were allotted and the total time spent on required tasks logged that day. 

<img src="./readme-images/time-dashboard.png" alt="Time input on dashboard">

To view bar graphs showing individual data and district averages broken down by day, teachers may click the reports button at the top of their dashboard. 

<img src="./readme-images/top-dashboard.png" alt="Reports tab on dashboard">

The two charts rendered at the top of the page show individual data, measured in hours. 

<img src="./readme-images/your-time-charts.png" alt="Your individual data on reports">

The two charts rendered at the bottom of the page show that school district's averages, measured in hours. 

<img src="./readme-images/dist-avg-charts.png" alt="District averages on reports">