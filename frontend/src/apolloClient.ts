/** @format */

import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import EventEmitter from 'eventemitter3';

// Create an EventEmitter instance
const tokenEmitter = new EventEmitter();

const getToken = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
};

// Initial token retrieval
let token = getToken("__session");
console.log({token});


// auth link
const createAuthLink = () => setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log("GraphQL error:", message, locations, path)
        );
    if (networkError) console.log("Network error:", networkError);
});

const httpLink = new HttpLink({ uri: "http://localhost:3000/graphql" });

let client = new ApolloClient({
    link: errorLink.concat(createAuthLink().concat(httpLink)),
    cache: new InMemoryCache(),
});

// Export the client for use in your application
export const getClient = () => client;

// Function to handle cookie changes
const handleCookieChange = () => {
    const newToken = getToken("__session");
    if (newToken !== token) {
        token = newToken;
        console.log("Token updated:", token);
		client.resetStore();
        // Reinitialize the Apollo Client
        client = new ApolloClient({
            link: errorLink.concat(createAuthLink().concat(httpLink)),
            cache: new InMemoryCache(),
        });

        // Emit the token change event
        tokenEmitter.emit('tokenChanged', client);
    }
};

// Set up a MutationObserver to listen for changes in the cookies
const observer = new MutationObserver(handleCookieChange);
observer.observe(document, { childList: true, subtree: true, characterData: true });

// Optionally, set up an interval to periodically check the cookies as a fallback
setInterval(handleCookieChange, 1000);

// Export the event emitter to listen for token changes
export { tokenEmitter };
