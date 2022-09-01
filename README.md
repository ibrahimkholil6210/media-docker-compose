## Installation

This project was bootstrapped with Create React App

To run the project locally,

1. Git clone this repository
   `https://github.com/ibrahimkholil6210/media-docker-compose.git`
2. Ensure you've installed node & npm to download the dependencies. The project has been tested with the following versions but should also work with later ones.
   - node: v16.8.0
   - npm: 7.21.0
3. Fist build Docker image using docker compose  `docker-compose build`
4. Run app using `docker-compose up`
5. Once both the server is up and running, open an API testing tool like Postman.
6. To register as user Visit `http://localhost:8080/api/v1/users/register` url using `post` method and put user object in request body. example:
   ```
    {
        "userName": "Ibrahim K",
        "email": "admin@gmail.com",
        "password": "122dfsd"
    }
   ```
7. To login Visit `http://localhost:8080/api/v1/users/login` url using `post` method and put login credential in request body and collect the jwt token to access `/scrapes` endpoint. example:
    ```
    {
        "email": "admin@gmail.com",
        "password": "122dfsd"
    }
   ```
8. To scrape data Visit `http://localhost:8080/api/v1/scrapes` url using `post' method and use the jwt token in authorization header as Bearer token from step 7. Also make sure to put urls to scrape in reqest body as json. example: 
     ```
    {
        "urls": ["https://fireship.io/","https://netninja.dev/"]
    }
   ```
At this time the URLs have been saved to the database. A corn job is running every five minutes, URLs will be fetched and the scraper will scrape data. So you can see the images and videos in f/e by visiting `http://localhost:3000` idealy after 5 minutes.