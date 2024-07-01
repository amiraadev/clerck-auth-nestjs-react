/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
	ClerkProvider,
	RedirectToSignIn,
	SignedIn,
	SignedOut,
} from "@clerk/clerk-react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RouteLayout from "./layouts/RouteLayout";
import HomePages from "./pages/HomePages";
import client from "./apolloClient";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<SignedIn>{children}</SignedIn>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</>
	);
};

const RouterComponent = () => {
	return (
		<ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
			<Routes>
				<Route path='' element={<RouteLayout />}>
					<Route
						index
						element={
							<ProtectedRoute>
								<HomePages />
							</ProtectedRoute>
						}
					/>
				</Route>
			</Routes>
		</ClerkProvider>
	);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
				<BrowserRouter>
					<RouterComponent />
				</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);

export default RouterComponent;
