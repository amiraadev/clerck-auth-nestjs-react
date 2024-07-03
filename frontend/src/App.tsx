/** @format */

import "./App.css";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/clerk-react";

import { useAuth } from "@clerk/clerk-react";
import { LoggedInQuery, LoggedInQueryVariables } from "./gql/graphql";
import { LOGGED_IN_QUERY } from "./graphql/queries/loggedIn";
import { useQuery } from "@apollo/client";

function App() {
	const { data, loading, error, refetch } = useQuery<
		LoggedInQuery,
		LoggedInQueryVariables
	>(LOGGED_IN_QUERY, {
		fetchPolicy: "network-only", // Ensure data is fetched from network
	});

	const { getToken, isLoaded, isSignedIn } = useAuth();

	const fetchDataFromExternalResource = async () => {
		const token = await getToken();
		return token;
	};
  
  const GraphqlApi = async () => {
		const logMessage = await data?.loggedIn;
		console.log("logMessage", logMessage);
	};

	const RESTApi = async () => {
		try {
			// Get the token
			const token = await getToken();
			console.log(token);

			// Make the API call with the token
			const response = await fetch("http://localhost:3000/user", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			// Check for successful response
			if (!response.ok) {
				throw new Error(`API call failed with status: ${response.status}`);
			}

			// Parse the response data
			const data = await response.text();
			console.log(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<header>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</header>
			{isSignedIn && (
				<>
					<h1>Hello Amira</h1>
					<button onClick={fetchDataFromExternalResource}>Get Token</button>
					<button onClick={RESTApi}>REST Api</button>
					<button onClick={GraphqlApi}>Graphql Api</button>
				</>
			)}
		</>
	);
}

export default App;
