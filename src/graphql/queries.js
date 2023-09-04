import gql from "graphql-tag";

export function GET_DATA(email) {
  return gql`
    query {
      user(email: "${email}") {
        firstName
        email
        trips {
          id
          name
          description
          startDate
          endDate
        }
      }
    }
  `;
}
