# Example of express serving react app

This example is meant to get you started, doesn't have a production environment, only dev (still, can be added).

>Remember for updates on the react-app to be served on the express app, you need to **BUILD the react app**. If you are running `npm run dev` and you make changes on the client, **it will NOT be updated** since the build is the one being served.
You can make all changes using the `npm run start` from the **CLIENT folder**, and once you're done, build your react app and serve it with express using `npm run dev` from the **ROOT folder**


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Executes the express server with nodemon (`nodemon index.js`).


### `npm run start`

Starts the **REACT** dev server **ONLY**, good to make all the changes you want on the front before building the project to serve it with express 


### `npm run build`

Builds the react app for serving on the `build` subfolder of the `client` folder 

## Steps to launch app:

- Clone this repository `https://github.com/jseiglie/express-serving-react` or fork it
- Start VSCode or use an online editor (Codespaces/GitPod) and load the repository.
- Access the client folder (`cd client/`)
- Build the react app (`npm run build`)
- Return to root folder (`cd ..`)
- Launch the express dev server (`npm run dev`)


Thanks and keep it up!
@JavierSeiglie