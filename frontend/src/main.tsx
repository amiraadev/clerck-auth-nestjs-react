/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { ApolloProvider } from "@apollo/client";

import { tokenEmitter, getClient } from "./apolloClient";
import App from "./App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

let client = getClient();

// Listen for token changes
tokenEmitter.on("tokenChanged", (newClient) => {
	client = newClient;
	// You can now use the updated client
	// console.log('Apollo Client updated:', client);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</ClerkProvider>
	</React.StrictMode>
);
