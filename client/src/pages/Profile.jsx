import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TripList from '../components/TripList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
    // const { username: userParam } = useParams();


    if (!Auth.loggedIn()) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    const { loading, data } = useQuery( QUERY_ME)
        
    

    const user = data?.me  || {};
    console.log (user)
    // if (
    //     Auth.loggedIn() &&
    //     /* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username, and compare it to the userParam variable */
    //     Auth.getProfile().authenticatedPerson.username === userParam
    // ) {
    //     return <Navigate to="/me" />;
    // }

    if (loading) {
        return <div>Loading...</div>;
    }

    

    return (
        <div>
            <div className="">
                <h2 className="">
                    Viewing your trips.
                </h2>
                <TripList trips={user.trips}/>
                <div className="">
                </div>
            </div>
        </div>
    );
};

export default Profile;