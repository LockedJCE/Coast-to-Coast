import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TripList from '../components/TripList';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
    // Check if the user is logged in
    if (!Auth.loggedIn()) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    // Get the current user's data
    const { loading, error, data } = useQuery(QUERY_ME);

    // Handle loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const user = data?.me || {};

    return (
        <div>
            <div className="mx-10">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Viewing your trips.
                </h2>
                <TripList trips={user.trips} />
                <div className="">
                </div>
            </div>
        </div>
    );
};

export default Profile;