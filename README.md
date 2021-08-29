# MARS ROVER DASHBOARD

## INTRODUCTION
For this project, I created a Mars rover dashboard that fetches data from the NASA API (https://api.nasa.gov/). Using the Javacript functional programming paradigm, I gathered data, created HTML elements, and displayed the requested API data on the page. The goal of this project was to become more comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses. 

## HOW IT WORKS
This dashboard allows users to display information from each of the three rovers, Curiosity, Opportunity, and Spirit. Once a rover is selected, the most recent images taken by that rover, as well as important information about the rover and its mission will be rendered on the page.

## HOW TO INSTALL
1. Clone this git repository.

2. Install dependencies.
 - In the terminal, run:
```yarn install``` 

**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

3. Next, get a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/.

3. In the repo, save the API key in the .env file.

4. Run `yarn start` in the terminal and go to `http:localhost:3000` to access the page.





