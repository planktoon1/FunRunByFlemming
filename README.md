# FunRunByFlemming
Demo: https://funrundemo.netlify.app/

Inspired by my dads running races i created this website. 
However at some point i decided i wanted to redo the entire thing, and build another version where content management and responsiveness would be the main focus.

### Unused code
As i didn't finish the project there are big chunks of the code that i never got to fully implement.

### Stack

#### Frontend
React, Material UI, gsap, typescript, AWS Cognito (authentication for admin page).

#### Backend
(Backend is in a very unfinished state)
Node js, Serverless Framework, AWS, AWS Lambda, AWS API Gateway, DynamoDB, AWS Cognito.

#### Known issues/bugs (apart from the fact that it's unfinished)
 * If a race from a future year is selected and the page is refreshed, the correct year will stay selected BUT the wrong year will be selected on the race selection page.
