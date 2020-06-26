# Initiation

#### Overview
- Create a fork of this repo and use it for your work.
- Submit your work by creating a pull request to the master branch
- Build app with function components and hooks
- Test user for you to use while developing:
    - Username: initiate
    - Password: illuminated
    
#### Project details
- Create a React app using create-react-app (https://github.com/facebook/create-react-app)
    - create-react-app: 
    - Add typescript support, use typescript files instead of js when possible
    - Add reactstrap (https://reactstrap.github.io/) and use it for page components
    
#### Page details
- Create 2 pages, sign-in and dashboard
    - Sign-in page
        - Add a form with username field, password field, and submit button
        - Show success and error messages
        - Use axios and send a http POST request to the API
            - URL: https://api.intelliscan.io/user/sign-in/
            - data:  `{username: <username>, password: <password>}`
        - Save JWT token to state (use React state, not redux)
        - On success, redirect to dashboard page
    - Dashboard page
        - Use an effect hook to load domains on page load
        - Use axios to send a http GET request to the API
            - URL: https://api.intelliscan.io/user/domains/
            - add header "token" and set the value to the JWT token from successful login
        - Show list of returned domains on a card on the dashboard page
