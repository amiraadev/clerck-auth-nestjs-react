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

	const { session } = useSession();
	const { isSignedIn } = useAuth();

	// const { loading, error, data } = useQuery(LOGGED_IN_QUERY);

	// useEffect(() => {
	// 	const createProfileFn = async () => {
	// 		if (data) {
	// 			const loggedinMessage = data.getServers;
	// 			console.log("message:", loggedinMessage);
	// 		}
	// 	};

	// 	createProfileFn();
	// }, [session?.user, profile?.id]);

	const { data, isLoading, error } = useQuery<
		LoggedInQuery,
		LoggedInQueryVariables
	>(LOGGED_IN_QUERY);

	const test = async() => {
		const logMessage = await data?.loggedIn;
		console.log("logMessage", logMessage);
	};

	useEffect(() => {
		if (!isSignedIn) setProfile(null);
	}, [isSignedIn, setProfile]);

	return (
		<div>
			<UserButton />
			<Outlet />
			<button onClick={()=>{test()}}>click here</button>
			{isLoading && <p>Loading profile...</p>}
			{error && <p>Error fetching profile: {error.message}</p>}
		</div>
	);
}

export default RouteLayout;
