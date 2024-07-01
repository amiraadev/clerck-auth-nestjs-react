/** @format */

import { onError } from "@apollo/client/link/error";
import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";

import { HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const getToken = (name: string) => {
	const value = `; ${document.cookie}`;
	// console.log(document.cookie);
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift();
};
// auth link
const authLink = setContext(async (_, { headers }) => {
	const token = getToken("__session");
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

const client = new ApolloClient({
	link: errorLink.concat(authLink.concat(httpLink)),
	cache: new InMemoryCache(),
});

export default client;
