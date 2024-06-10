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
    <div className="mx-10 tracking-tight text-gray-900">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">{trip.title}</h2>
      <p className="sm:text-2xl">{trip.description}</p>
      <p>Start Date: {formatDate(trip.startDate)}</p>
      <p>End Date: {formatDate(trip.endDate)}</p>
      <br></br>

      <h3 className="ml-5 flex items-center gap-x-2 sm:text-2xl font-bold text-gray-900">Itineraries</h3>
      {trip.itineraries.length > 0 ? (
        trip.itineraries.map((itinerary) => (
          <div key={itinerary._id} className="ml-5">
            <h4>Date: {formatDate(itinerary.date)}</h4>
            <h5>Activities:</h5>
            {itinerary.activities.length > 0 ? (
              <ul role="list" className="divide-y divide-gray-100">
                {itinerary.activities.map((activity) => (
                  <li key={activity._id} className="flex items-center gap-x-6 py-5">
                    <strong>{activity.title}</strong> - {activity.description}
                    <p>Location: {activity.location}</p>
                    <p className="whitespace-nowrap">Start Time: {formatTime(activity.startTime)}</p>
                    <p className="whitespace-nowrap">End Time: {formatTime(activity.endTime)}</p>
                    <p className="font-bold">Expense: {activity.expense ? `${activity.expense.description} - $${activity.expense.amount}` : 'No Expense'}</p>
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