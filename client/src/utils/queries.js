import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      trips {
        title
        description
        startDate
        endDate
        itineraries
        expenses
      }
    }
  }
`;

export const QUERY_TRIPS = gql`
  query getTrips {
    trips {
        title
        description
        startDate
        endDate
        itineraries
        expenses
      }
  }
`;

export const QUERY_SINGLE_TRIP = gql`
  query getSingleTrip($tripId: ID!) {
    trip(tripId: $tripId) {
      _id
      username
      email
      trips {
        title
        description
        startDate
        endDate
        itineraries
        expenses
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      trips {
        title
        description
        startDate
        endDate
        itineraries
        expenses
      }
    }
  }
`;
