import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_TRIP } from '../utils/queries';
import { formatDate, formatTime } from '../utils/formatDate';

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
      <p>Start Date: {formatDate(trip.startDate)}</p>
      <p>End Date: {formatDate(trip.endDate)}</p>
      <br></br>

      <h3>Itineraries</h3>
      {trip.itineraries.length > 0 ? (
        trip.itineraries.map((itinerary) => (
          <div key={itinerary._id}>
            <h4>Date: {formatDate(itinerary.date)}</h4>
            <h5>Activities:</h5>
            {itinerary.activities.length > 0 ? (
              <ul>
                {itinerary.activities.map((activity) => (
                  <li key={activity._id}>
                    <strong>{activity.title}</strong> - {activity.description}
                    <p>Location: {activity.location}</p>
                    <p>Start Time: {formatTime(activity.startTime)}</p>
                    <p>End Time: {formatTime(activity.endTime)}</p>
                    <p>Expense: {activity.expense ? `${activity.expense.description} - $${activity.expense.amount}` : 'No Expense'}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No activities for this itinerary.</p>
            )}
          </div>
        ))
      ) : (
        <p>No itineraries available.</p>
      )}
    </div>
  );
};

export default TripDetail;