# BandAid Project

BandAid is a full-stack web application designed to help bands manage their members, setlists, live events and much more. The backend is built with Express.js and Sequelize, while the frontend is developed using React and Vite.


</br>

## Project Overview

BandAid provides a platform for bands to:
- Manage band members and their roles.
- Create and manage setlists for performances.
- Schedule and manage live events.
- Maintain musician profiles with social media links.
- Keep track of band performance schedules and showcase their work.
- Keep track of your songs and have a detailed music catalog.


</br>

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your system.
- Familiarity with React, Express.js, and Sequelize is recommended.
- SQL database should be installed and configured (we used MariaDb).


</br>

### Database Setup

1. install MariaDB (or any other SQL database supported by Sequelize)
2. Update or create the `config/database.js` file with your database connection details (this config folder should be on the root of the proyect).


</br>

```javascript

require('dotenv').config()

let db = {
    host: <your-host>,
    dialect: 'mariadb', // the dialect your database uses 
    port: <db-port>,
    user: <your-db-user>,
    pass: <your-db-password>,
    database:'bandaid'
}
if (process.env.ENV=='dev'){
    db.user=<your-db-user>
    db.pass=<your-db-password>
    db.database='bandaid'
}

module.exports = db

```
Once fully configured, you can run the app and the database will be created.


</br>

### Seeding the Database

It's important to have the database tables created before running the seeding script (explained at Database setup).

To seed the database, run the following command:

`npm run seed`
This script will generate sample data for testing purposes.


</br>

### Running the App


</br>

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/bandaid.git
   cd bandaid
   ```

2. **Install Backend Dependencies:**
    ```bash
    npm install
    ```

3. **Install Frontend Dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

</br>

### Available Scripts

In the project directory, you can run:

`npm run dev`
Runs the Express server with nodemon for development. The server will restart automatically if you make edits.

`npm run start`
Starts the React development server. Use this to work on the frontend independently.

`npm run build`
Builds the React application for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

`npm run seed`
Seeds the database with initial data. Ensure your database is set up and configured before running this script.

`npm run migrate`
Executes Sequelize migrations to update the database schema.


</br>

### Running the Application

To start the application, follow these steps:


1. **Build the React Application:**
    ```bash
    cd client
    npm run build
    cd ..
    ```

2. **Start the Express Server:**
    ```bash
    npm run dev
    ```

3. **Access the Application:**

Open your browser and navigate to http://localhost:3000 to view the application.


</br>

### Environment Variables

To use BandAid, you'll need to set up environment variables. These variables are used to secure sensitive information and configure the application.

- **Create a.env file:**

Create a .env file in the root directory to configure environment variables. 

 - **Example:**

Here are some environment variables that should be set in your.env file:
   
    VITE_APP_API_URL=your-api-url
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRATION=desired-time-in-seconds
    PRODUCTION= 0 //or 1 (set to 1 for production)
  

</br>

### Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.


</br>

### Requesting a Feature

Feel free to open an issue for any new features you would like to add or any bugs you encounter. We'll work together to resolve them.


</br>

### Acknowledgments

Thanks to all contributors and the open-source community for their support and inspiration.