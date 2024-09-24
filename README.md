# Web3 Delivery App

## Overview

This project is a decentralized delivery application that leverages blockchain technology and The Graph protocol to secure deliveries. By using smart contracts, it allows for transparency and accountability in the delivery process. The application allows users to send and receive packages securely in a user owned application, while delivery personnel can manage their tasks effectively.

## Features

- **Wallet Connection**: Users can connect their wallets (e.g., MetaMask) to the application.
- **Role Selection**: Users can choose between two roles: Sender/Recipient or Delivery Person.
- **Package Management**: Users can create and manage package deliveries using smart contracts.
- **Real-Time Data Queries**: Utilize The Graph to fetch package details, ratings, and completion rates in real-time.

## Technologies Used

- **Ethereum**: Smart contracts for managing delivery transactions.
- **The Graph**: A decentralized protocol for indexing and querying blockchain data.
- **Apollo Client**: For managing GraphQL queries in the frontend.
- **Next.js**: For building the user interface.
- **Web3.js**: For interacting with the Ethereum blockchain.

## How It Works

### Smart Contract for Deliveries

**Smart Contract Addresses**:
- Delivery Contract: [Address](https://eth-sepolia.blockscout.com/address/0x8BA77209a94d16CA5d4f7Bf3A8641927B69046aA)
- Ratings Contract: [Address](https://eth-sepolia.blockscout.com/address/0x2Bd08EE606CcB8f74bd3770e04C5c2F2dE17e25b)

The core functionality of the application is managed through a smart contract that:

1. **Creates Package Orders**: Users can create package orders that include essential details such as sender, recipient, and postage.
2. **Manages Delivery Status**: The contract tracks the status of deliveries (e.g., picked up, delivered).
3. **Validates Delivery**: Upon delivery, the recipient verifies the package, triggering the contract to release funds to the delivery person.
4. **Manages Delivery Ratings**: Allows users to rate their delivery experience.

### Utilizing The Graph Protocol

The Graph is used to enable efficient data retrieval from the blockchain, enhancing the application's performance. Here's how:

1. **Subgraph Creation**: A subgraph is created to index the events emitted by the smart contract, including package creations, updates, and delivery confirmations.(check here)[https://thegraph.com/studio/subgraph/web3deliveries/playground]
   
3. **GraphQL Queries**: The frontend uses GraphQL queries to fetch data from The Graph:
   - **Get Packages**: Retrieves all packages based on the user's address and role.
   - **Get Ratings**: Fetches ratings given by users based on their delivery experience.
   - **Get Completion Rate**: Gathers statistics on delivery completion rates for users.

## Example Queries

Here are some example GraphQL queries used in the application: 
if you want to check their usag check here [dasboard.jsx](https://github.com/JudeTulel/web3deliveries/blob/main/src/components/dashboard.jsx) 

```javascript
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

export { 
  GET_PACKAGES_PICKED_UP, 
  GET_PACKAGES_CREATED, 
  GET_PACKAGES_DELIVERED, 
  GET_PACKAGES_CREATED_BY_SENDER 
};
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JudeTulel/web3deliveries
   cd web3deliveries
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm run dev
   ```

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request with your changes.
