import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../utils/queries';

const TripDetail = () => {
  const { tripId } = useParams();
  const { loading, error, data } = useQuery(QUERY_SINGLE_TRIP, {
    variables: { tripId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const trip = data?.trip;

  return (
    <div>
      <h2>{trip.title}</h2>
      <p>{trip.description}</p>
      <p>Start Date: {new Date(trip.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(trip.endDate).toLocaleDateString()}</p>
      {/* Render other trip details as needed */}
    </div>
  );
};

export default TripDetail;