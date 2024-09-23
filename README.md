# Web3 Delivery App

## Overview

This project is a decentralized delivery application that leverages blockchain technology and The Graph protocol to secure deliveries. By using smart contracts, it ensures transparency and accountability in the delivery process. The application allows users to send and receive packages securely, while delivery personnel can manage their tasks effectively.


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
