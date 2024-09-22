# Web3 Delivery App

## Overview

This project is a decentralized delivery application that leverages blockchain technology and The Graph protocol to secure deliveries. By using smart contracts, it ensures transparency and accountability in the delivery process. The application allows users to send and receive packages securely, while delivery personnel can manage their tasks effectively.

## Features

- **Wallet Connection**: Users can connect their wallets (e.g., MetaMask) to the application.
- **Role Selection**: Users can choose between two roles: Sender/Recipient or Delivery Person.
- **Package Management**: Users can create and manage package deliveries using smart contracts.
- **Real-Time Data Queries**: Utilize The Graph to fetch package details, ratings, and completion rates in real-time.

## Technologies Used

- **Ethereum**: Smart contracts for managing delivery transactions.
- **The Graph**: A decentralized protocol for indexing and querying blockchain data.
- **Apollo Client**: For managing GraphQL queries in the frontend.
- **React**: For building the user interface.
- **Web3.js**: For interacting with the Ethereum blockchain.

## How It Works

### Smart Contract for Deliveries
#### https://eth-sepolia.blockscout.com/address/0x8BA77209a94d16CA5d4f7Bf3A8641927B69046aA
#### https://eth-sepolia.blockscout.com/address/0x2Bd08EE606CcB8f74bd3770e04C5c2F2dE17e25b

The core functionality of the application is managed through a smart contract that:

1. **Creates Package Orders**: Users can create package orders that include essential details such as sender, recipient, and postage.
2. **Manages Delivery Status**: The contract tracks the status of deliveries (e.g., picked up, delivered).
3. **Validates Delivery**: Upon delivery, the recipient verifies the package, triggering the contract to release funds to the delivery person.

### Utilizing The Graph Protocol

The Graph is used to enable efficient data retrieval from the blockchain, enhancing the application's performance. Here's how:

1. **Subgraph Creation**: A subgraph is created to index the events emitted by the smart contract, including package creations, updates, and delivery confirmations.
   
2. **GraphQL Queries**: The frontend uses GraphQL queries to fetch data from The Graph:
   - **Get Packages**: Retrieves all packages based on the user's address and role.
   - **Get Ratings**: Fetches ratings given by users based on their delivery experience.
   - **Get Completion Rate**: Gathers statistics on delivery completion rates for users.

### Example Queries

Here are some example GraphQL queries used in the application:

```graphql
query GetPackages($address: String!, $role: String!) {
  packages(where: { ${role === 'user' ? 'sender' : 'deliveryGuy'}: $address }) {
    id
    postage
    minRating
    sender
    recipient
    deliveryGuy
    isPickedUp
    isDelivered
  }
}

query GetRatings($address: String!) {
  ratings(where: { user: $address }) {
    id
    ratingValue
    comment
    timestamp
  }
}

query GetCompletionRate($address: String!) {
  completionRate(where: { user: $address }) {
    rate
    totalDeliveries
    completedDeliveries
  }
}
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
