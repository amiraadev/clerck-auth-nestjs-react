import { gql } from "@apollo/client"

export const LOGGED_IN_QUERY = gql`
  query LoggedIn{
    loggedIn
  }
`;