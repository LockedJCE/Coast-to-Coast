import React from 'react';
import { Link } from 'react-router-dom';

const TripList = ({ trips }) => {
  if (!trips.length) {
    return <h3>No Trips Yet</h3>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {trips.map((trip) => (
          <li key={trip._id} className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">{trip.title}</p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  From <time dateTime={trip.startDate}>{formatDate(trip.startDate)}</time> to <time dateTime={trip.endDate}>{formatDate(trip.endDate)}</time>
                </p>
                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="truncate">Created by {trip.user?.username}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <Link
                to={`/trip/${trip._id}`}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                View trip<span className="sr-only">, {trip.title}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripList;