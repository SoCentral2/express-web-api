//Codecademy exercise at https://www.codecademy.com/paths/full-stack-engineer-career-path/tracks/fscp-22-build-a-back-end-with-express-js/modules/wdcp-22-challenge-project-quote-api/projects/quote-api
//! NB Code annotations only from Step3.
//* Start with node server.js or nodemon server.js

/** 
 * TODO: Add a PUT route for updating quotes in the data. This might require adding some sort of unique ID for each quote in the array in data.js. 
 ** Add a DELETE route for deleting quotes from the data array. As with PUT, this might require adding IDs to the data array and using req.params. For both of these ideas, you’ll be able to interact via Postman.
** Add other data to the array, such as the year of each quote, and try to display it on the front-end.
** Add another resource to your API in addition to quotes, such as biographical blurbs (you’ll need to find your own data for this new resource). Use Express Routers to keep your code simple and separated into different files for each router.
** For most of these ideas, you might need to look into the front-end code in the public/ folder. If you’re not as familiar with front-end JavaScript, try our Build Interactive JavaScript Websites course and the Requests section of our Introduction to JavaScript course.
*/ 

// Import the express module to create an Express application
const express = require('express');
// Initialize the Express application
const app = express();

// Import the quotes array from the data module
const { quotes } = require('./data');
// Import the getRandomElement function from the utils module
const { getRandomElement } = require('./utils');

// Set the port for the server to listen on. Use the PORT environment variable if provided, otherwise default to 4001
const PORT = process.env.PORT || 4001;

//* Step3 : 
//* Once you start up the server with node server.js, navigate to localhost:4001 in the browser. You’ll know things are up and running when you load the blue Quote API site in the browser.
//*This diagram explains how the front-end buttons correspond to different request routes. https://www.codecademy.com/paths/full-stack-engineer-career-path/tracks/fscp-22-build-a-back-end-with-express-js/modules/wdcp-22-challenge-project-quote-api/projects/quote-api#:~:text=Once%20you%20start,request%20routes.

/* This is setting up the Express application to listen on a specific port for incoming requests. When a client makes a request to that port, the server will respond accordingly. */
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

/* This is a middleware function in Express that serves static files
such as images, CSS files, and JavaScript files from the specified directory ('public' in this
case). This line of code tells Express to look for static files in the 'public' directory and serve
them to the client when requested. This is commonly used to serve front-end assets like HTML, CSS,
and client-side JavaScript files. */
app.use(express.static('public'));

//* Step4 : 
//* Your API should have a GET /api/quotes/random route. This route should send back a random quote from the quotes data. The response body should have the following shape:
// *    {
// *        quote: {/* quote object */}
// *    }
/* This code snippet defines a GET route at '/api/quotes/random' in the Express application. When a
client makes a GET request to this route, the server responds by sending back a random quote from
the 'quotes' data array. */
app.get('/api/quotes/random', (req, res) => { 
    const shapedQuote = {quote: getRandomElement(quotes)};   
    res.send(shapedQuote);
});

//* Step5 : 
//* Your API should have a GET /api/quotes route. This route should return all quotes from the data if the request has no query params.
//* If there is a query string with a person attribute, the route should return all quotes said by the same person. For instance, the data set has multiple quotes for Grace Hopper, so GET /api/quotes?person=Grace Hopper should return an array of only those quotes. If there are no quotes for the requested person, send back an empty array.
//*The response body should have the following shape for all GET /api/quotes requests:
//*     {
//*         quotes: [ /* Array of requested quotes */ ]
//*     }

/* This code snippet defines a GET route at '/api/quotes/' in the Express application. When a client
makes a GET request to this route, the server checks if there is a 'person' query parameter in the
request. If the 'person' query parameter is provided, the server filters the quotes array by the
author's name (person) specified in the query parameter. It then sends back a response containing an
array of quotes said by that specific person. */
app.get('/api/quotes/', (req, res) => {
    // Extract the 'person' query parameter from the request
    const { person } = req.query;
    // If a 'person' query parameter is provided, filter the quotes by the author's name
    if (person) {
        // Call a function that filters quotes by the provided author's name
        const response = quotes.filter(quote => quote.person === person);
        // Send the filtered list of quotes as a response
        res.send({ quotes: response });
    } else { //if there's no person, return all quotes
        res.send({ quotes: quotes });
    }
});

//* Step6 : 
//* Your API should have a POST /api/quotes route for adding new quotes to the data. New quotes will be passed in a query string with two properties: quote with the quote text itself, and person with the person who is credited with saying the quote.
//*This route should verify that both properties exist in the request query string and send a 400 response if it does not. If all is well, this route handler should add the new quote object to the data array and send back a response with the following shape:

/* This code snippet is setting up a POST route at '/api/quotes' in the Express application. When a client makes a POST request to this route, the server checks if the request query string contains both 'person' and 'quote' properties. */
app.post('/api/quotes', (req, res) => {
    const person = req.query.person;
    const quote = req.query.quote;

    if (person && quote) {
        // Add the new quote to the quotes array
        quotes.push({ quote, person });
        // Send the new quote as a response
        res.status(201).send({ quote: { quote, person } });
    } else {
        // Send a 400 error response if one or both properties are missing
        res.status(400).send();
    }

});