import { gql } from '@apollo/client';

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
        itineraries {
          _id
          date
          activities {
            _id
            title
            description
            location
            startTime
            endTime
            expense {
              _id
              description
              amount
              date
              category
            }
          }
        }
        expenses {
          _id
          description
          amount
          date
          category
        }
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
      itineraries {
        _id
        date
        activities {
          _id
          title
          description
          location
          startTime
          endTime
          expense {
            _id
            description
            amount
            date
            category
          }
        }
      }
      expenses {
        _id
        description
        amount
        date
        category
      }
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
        itineraries {
          _id
          date
          activities {
            _id
            title
            description
            location
            startTime
            endTime
            expense {
              _id
              description
              amount
              date
              category
            }
          }
        }
        expenses {
          _id
          description
          amount
          date
          category
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      email
      trips {
        _id
        title
        description
        startDate
        endDate
        user {
          username
        }
        itineraries {
          _id
          date
          activities {
            _id
            title
            description
            location
            startTime
            endTime
            expense {
              _id
              description
              amount
              date
              category
            }
          }
        }
        expenses {
          _id
          description
          amount
          date
          category
        }
      }
    }
  }
`;