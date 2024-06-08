import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addTrip($title: String!) {
    addTrip(title: $title) {
      _id
      title
      description
      startDate
      endDate
      itineraries
      expenses
    }
  }
`;

export const REMOVE_TRIP = gql`
  mutation removeTrip($tripId: ID!) {
    removeBook(tripId: $tripId) {
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