/** @format */

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useProfileStore } from "../stores/profileStore";
import { useAuth, useSession } from "@clerk/clerk-react";
import { useQuery } from "@apollo/client";
import { LoggedInQuery, LoggedInQueryVariables, Query } from "../gql/graphql";

import { UserButton } from "@clerk/clerk-react";
import { LOGGED_IN_QUERY } from "../graphql/queries/loggedIn";

function RouteLayout() {
	const profile = useProfileStore((state) => state.profile);
	const setProfile = useProfileStore((state) => state.setProfile);

	// const token = useTokenStore((state) => state.token);
	// const setToken = useTokenStore((state) => state.setToken);

	const { session } = useSession();
	const { isSignedIn } = useAuth();

	const { data, isLoading, error, refetch } = useQuery<
		LoggedInQuery,
		LoggedInQueryVariables
	>(LOGGED_IN_QUERY, {
		fetchPolicy: "network-only", // Ensure data is fetched from network
	});

	const test = async () => {
		console.log("Button clicked"); // Check if button click is registered

		const logMessage = await data?.loggedIn;
		console.log("logMessage", logMessage);
	};

	useEffect(() => {
		console.log("Query loading:", isLoading);
		console.log("Query data:", data);
		if (!isLoading && data) {
			test();
		}
	}, [isLoading, data]);

	useEffect(() => {
		if (!isSignedIn) setProfile(null);
	}, [isSignedIn, setProfile]);

	const handleClick = () => {
		refetch(); // Retry the query
	};
	return (
		<div>
			<UserButton />
			<Outlet />
			<button
				onClick={() => {
					test();
				}}>
				click here
			</button>
			<button
				onClick={() => {
					handleClick();
				}}>
				Refech
			</button>
			{isLoading && <p>Loading profile...</p>}
			{error && <p>Error fetching profile: {error.message}</p>}
		</div>
	);
}

export default RouteLayout;
