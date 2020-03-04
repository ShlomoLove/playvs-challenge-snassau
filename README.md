# playvs-challenge-snassau
A Tournament Challenge Using Open API


## On Opening RUN Available Scripts

In the project directory, you can run:

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn start` or `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Description of the Tournament Challenge

When the App loads it makes an API call to the Open Data API to grab all the teams. The API request includes an array of teams. The array is arranged in order of rank; therefore, the top 16 teams are in the first sixteen indices of the array. These are the teams that qualify to compete in the Tourment. 

The user can simulate each match by clicking the button to simulate a winner. The simulated match picks a random winner, but mathmatical preference is given to the team with the higher rank. Thus the higher rank has greater chance of advancing. Once each of the games have been completed in each round, the matches for the next round will appear. 

If you click on a team name, the pertinent information for that team will appear, which includes name, logo, ranking, wins, losses and CURRENT players. 

Once all the games have been simulated a modal will appear celebrating the winner of the tournament. 

