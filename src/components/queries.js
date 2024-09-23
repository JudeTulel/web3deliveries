import { gql } from '@apollo/client';
// Get Packages Picked Up
const GET_PACKAGES_PICKED_UP = gql`
  query GetPackagesPickedUp($first: Int!, $orderBy: String!, $orderDirection: String!) {
    packagePickedUps(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      packageId
      deliveryGuy
      timestamp
    }
  }
`;

// Get Packages Created
const GET_PACKAGES_CREATED = gql`
  query GetPackagesCreated($first: Int!, $orderBy: String!, $orderDirection: String!) {
    packageCreateds(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      packageId
      sender
      recipient
      blockTimestamp
    }
  }
`;

// Get Packages Delivered
const GET_PACKAGES_DELIVERED = gql`
  query GetPackagesDelivered($first: Int!, $orderBy: String!, $orderDirection: String!) {
    packageDelivereds(first: $first, orderBy: $orderBy, orderDirection: $orderDirection) {
      id
      packageId
      deliveryGuy
      timestamp
    }
  }
`;

// Get Packages Created By Sender
const GET_PACKAGES_CREATED_BY_SENDER = gql`
  query GetPackagesCreatedBySender($sender: String!) {
    packageCreateds(where: { sender: $sender }) {
      id
      sender
      recipient
    }
  }
`;

export { GET_PACKAGES_PICKED_UP, GET_PACKAGES_CREATED, GET_PACKAGES_DELIVERED, GET_PACKAGES_CREATED_BY_SENDER };
