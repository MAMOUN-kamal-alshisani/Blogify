# Mn-Blogger
**`blogs website built using react.js for frontend (client), and node.js for backend (server)
 mn-blogger was built with the thought of spreading knowledge, awareness and awesomeness, users can share their thougts, ideas and blog about their journey in life with just a click `**

# Install
**- git clone git@github.com:MAMOUN-kamal-alshisani/MNBlog.git**

## Server and Client directories
**- `cd server`**
**- `cd client`**

## once in the directory in terminal
**`npm i` or `npm install` to install all libraries and dependencies**

# Usage

## Server Backend
**- Start postgreSQL service to connect to the database with the following command: `sudo service postgresql start`
`note that that local configurations must be provided in order to connect to the database`** 
  
**- start the server with `(nodemon)` or `(npm start)`**
  
## Client Frontend
**- start the client side (npm start)**

# Features

## User Authentication and authorization 

**- Allow users to register an account with email and password
Enable users to log in and log out securely**
**- Implement password hashing and salting for enhanced security**
**- in server use JWT to create and store a token in cookies to authenticate and authorize a user or an admin making some end point actions**
**- in client use cookies to store user information for authenicating authorizing user entring certain protected routes**



## Error Handling
**Implement error handling for various scenarios (e.g., invalid requests, server errors)
Return appropriate error messages and status codes to clients**

deployed site link: https://mn-blog.netlify.app/
