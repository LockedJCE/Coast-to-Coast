import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TripList from '../components/TripList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    if (
        Auth.loggedIn() &&
        /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
        Auth.getProfile().authenticatedPerson.username === userParam
    ) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        <div>
            <div className="">
                <h2 className="">
                    Viewing {userParam ? `${user.username}'s` : 'your'} trips.
                </h2>
                <TripList />
                <div className="">
                </div>
            </div>
        </div>
    );
};

export default Profile;