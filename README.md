# Group Looper
## A Multi-player Music Looping Tool For Real-Time Remote Collaboration

To try it for yourself, visit [Group Looper on Surge](https://erratic-pest.surge.sh)

Here's the link for the [Group Looper Backend Repo on Github](https://github.com/edensongjbs/group-looper-backend)

Check Out the [Video Demo](https://www.youtube.com/watch?v=v2WPS7YCb0U&list=PLjQ6pMJBYCggIXv9A20GPGB2SEx_aymRO&index=1)

## Tech Stack

**Built With**
- React.js
- Redux/Redux-Thunk
- Ruby on Rails (API) with ActionCable (WebSocket)
- Tone.js
- Custom CSS

## About

**Group Looper** is my response to an urge to collaborate musically despite our current need for physical isolation. The platform acts as a typical music looping tool where the user can initiate a new session, record a part, save it, and then start to layer new parts on top of it.  However, **Group Looper** also allows a user to invite other users to their session and build upon each other's musical ideas in real time.  Because everything is loop based and repeats at predictable, pre-defined intervals, we don't need to minimize latency the same way we would in a typical remote collaboration session, which is impossible in most cases.

## Instructions

You can visit a deployed demo version of **Group Looper** [here](https://erratic-pest.surge.sh).  Please note that the back-end API for the playable demo is currently deployed on Heroku, so the first API request can take a while before the server responds.  Subsequent Requests should be fairly quick.

### Getting Started

Start by starting a new account or logging into an existing account.  Once logged in, you can choose an existing session or start a new one.  When setting up a new session, please note: 
- Tempo is in beats per measure (bpm).  The metronome always clicks the quarter note, accenting the first beat of the bar, so very slow tempos are not recommended.  - Number of Bars refers to the total number of measures before the composition loops back to the beginning.  The metronome track provides no countoff bars before the downbeat of measure 1, so if you want to record a phrase starting on beat 1 of measure 1, you should wait an entire cycle of the composition before playing the part.

### The Session

Once you're inside a loop session, the sampler will respond to keypresses.  Middle row keys A-K correspond to the white keys in order, and the corresponding upper row keys are the black keys.

Start off by selecting a sound/patch from the dropdown menu.  You can name the new layer by double clicking the text "Enter Layer Name" and typing in a new name.

When you are ready to start recording, hit the play button and wait an appropriate number of metronome cliks before entering.

You can stop and restart the loop at any point.

If you want to commit your part and start work on a new part, hit the commit button and the newly created layer will show up on the right hand side "Layers" container.  You can mute and unmute layers by clicking the layer name and you can permanently delete the part by clicking on the "X" icon next to the corresponding layer name.

If you want to add a collaborator to the session, click on the "+" icon to the left of the title text for the Users container.  You'll be prompted to enter the user name.  There is currently no mechanism for searching for active users, so you will need to enter your collaborator's username precisely (they will need to have an account before they can be added).  

All users will have control over muting/unmuting layers in their local session, but a user can only delete their own layers, unless they are the owner of the session, in which case they can delete any layer except the read-only metronome track.



# Default React Readme



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
