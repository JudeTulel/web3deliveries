 const PackageDeliveryAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsDeposited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "FundsTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "PackageCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "PackageDelivered",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "name": "PackagePickedUp",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "postage",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "minRating",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "createPackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            }
        ],
        "name": "deliverPackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_packageId",
                "type": "uint256"
            }
        ],
        "name": "depositFunds",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "packageVerified",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "packages",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "postage",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "minRating",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pickupTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isPickedUp",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isDelivered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            }
        ],
        "name": "pickupPackage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "senderDeposits",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "packageId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "proximityCheck",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "verifyPackageId",
                "type": "bool"
            }
        ],
        "name": "verifyAndCompleteDelivery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
 const RatingContractAbi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "name": "DeliveryCompleted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "PackageSent",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            },
            {
                "internalType": "uint8",
                "name": "rating",
                "type": "uint8"
            },
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "name": "completeDelivery",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "deliveryGuys",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalDeliveries",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "successfulDeliveries",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ratingSum",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ratingCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            }
        ],
        "name": "getAverageRating",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "deliveryGuy",
                "type": "address"
            }
        ],
        "name": "getCompletionRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "getTotalPackagesSent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "packageSent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "senders",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "totalPackagesSent",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export { PackageDeliveryAbi, RatingContractAbi };