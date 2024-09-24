"use client";
import React, { useState, useEffect } from "react";
import { request, gql } from "graphql-request";
import Web3 from "web3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  GET_PACKAGES_PICKED_UP,
  GET_PACKAGES_CREATED,
  GET_PACKAGES_DELIVERED,
  GET_PACKAGES_CREATED_BY_SENDER
} from "./queries";
import { PackageDeliveryAbi, RatingContractAbi } from '../constants/ContractAbi';

const GRAPH_API_URL = 'https://api.studio.thegraph.com/query/88640/web3deliveries/"v0.0.5"';
const CONTRACT_ADDRESS = "0x8BA77209a94d16CA5d4f7Bf3A8641927B69046aA";
const CONTRACT_ABI = PackageDeliveryAbi;
const RATING_CONTRACT_ADDRESS = "0x2Bd08EE606CcB8f74bd3770e04C5c2F2dE17e25b";
const RATING_CONTRACT_ABI = RatingContractAbi;

export default function Dashboard({ address, role }) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [ratingContract, setRatingContract] = useState(null);
  const [packages, setPackages] = useState([]);
  const [stats, setStats] = useState({});
  const [pickedUpPackages, setPickedUpPackages] = useState([]);
  const [deliveredPackages, setDeliveredPackages] = useState([]);
  const [createdPackages, setCreatedPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    recipient: "",
    postage: "",
    minRating: "",
  });
  const [rating, setRating] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);
        const ratingContractInstance = new web3Instance.eth.Contract(RATING_CONTRACT_ABI, RATING_CONTRACT_ADDRESS);
        setRatingContract(ratingContractInstance);
      }
    };
    initWeb3();
  }, []);

  useEffect(() => {
    if (address && role) {
      fetchPackages();
      fetchStats();
      fetchPackagesPickedUp();
      fetchPackagesDelivered();
      fetchPackagesCreatedBySender();
    }
  }, [address, role, web3]);

  const fetchPackages = async () => {
    const variables = {
      first: 10,
      orderBy: "blockTimestamp",
      orderDirection: "desc",
    };
    try {
      const data = await request(GRAPH_API_URL, GET_PACKAGES_CREATED, variables);
      setCreatedPackages(data.packageCreateds);
    } catch (error) {
      console.error("Error fetching created packages:", error);
    }
  };

  const fetchPackagesPickedUp = async () => {
    const variables = {
      first: 10,
      orderBy: "timestamp",
      orderDirection: "desc",
    };
    try {
      const data = await request(GRAPH_API_URL, GET_PACKAGES_PICKED_UP, variables);
      setPickedUpPackages(data.packagePickedUps);
    } catch (error) {
      console.error("Error fetching picked-up packages:", error);
    }
  };

  const fetchPackagesDelivered = async () => {
    const variables = {
      first: 10,
      orderBy: "timestamp",
      orderDirection: "desc",
    };
    try {
      const data = await request(GRAPH_API_URL, GET_PACKAGES_DELIVERED, variables);
      setDeliveredPackages(data.packageDelivereds);
    } catch (error) {
      console.error("Error fetching delivered packages:", error);
    }
  };

  const fetchPackagesCreatedBySender = async () => {
    const variables = {
      sender: address.toLowerCase(),
    };
    try {
      const data = await request(GRAPH_API_URL, GET_PACKAGES_CREATED_BY_SENDER, variables);
      console.log(data.packageCreateds);
    } catch (error) {
      console.error("Error fetching packages by sender:", error);
    }
  };

  const handleCreatePackage = async () => {
    try {
      await contract.methods
        .createPackage(Date.now(), web3.utils.toWei(newPackage.postage, 'ether'), newPackage.minRating, newPackage.recipient)
        .send({ from: address });
      toast({ title: 'Success', description: 'Package created successfully.' });
      fetchPackages();
    } catch (error) {
      console.error('Error creating package:', error);
      toast({
        title: 'Error',
        description: 'Failed to create package.',
        variant: 'destructive',
      });
    }
  };

  const handleDepositFunds = async (packageId, postage) => {
    try {
      await contract.methods.depositFunds(packageId).send({ from: address, value: postage });
      toast({ title: 'Success', description: 'Funds deposited successfully.' });
      fetchPackages();
    } catch (error) {
      console.error('Error depositing funds:', error);
      toast({
        title: 'Error',
        description: 'Failed to deposit funds.',
        variant: 'destructive',
      });
    }
  };

  const handlePickupPackage = async (packageId) => {
    try {
      await contract.methods.pickupPackage(packageId, address).send({ from: address });
      toast({ title: 'Success', description: 'Package picked up successfully.' });
      fetchPackages();
    } catch (error) {
      console.error('Error picking up package:', error);
      toast({
        title: 'Error',
        description: 'Failed to pick up package.',
        variant: 'destructive',
      });
    }
  };

  const handleDeliverPackage = async (packageId) => {
    try {
      await contract.methods.deliverPackage(packageId).send({ from: address });
      toast({ title: 'Success', description: 'Package delivered successfully.' });
      fetchPackages();
    } catch (error) {
      console.error('Error delivering package:', error);
      toast({
        title: 'Error',
        description: 'Failed to deliver package.',
        variant: 'destructive',
      });
    }
  };
  const fetchStats = async () => {
    const query = gql`
      query GetStats($address: String!) {
        user(id: $address) {
          totalDeliveries
          successfulDeliveries
          averageRating
          completionRate
        }
      }
    `;

    try {
      const data = await request(GRAPH_API_URL, query, { address: address.toLowerCase() });
      if (data.user) {
        setStats(data.user);
      } else {
        throw new Error('No stats data available');
      }
    } catch (error) {
      console.error('Error fetching stats from The Graph:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch stats from the Graph API.',
        variant: 'destructive',
      });
      fetchStatsFallback();
    }
  };
  const fetchStatsFallback = async () => {
    if (!ratingContract) return;

    try {
      let statsData = {};
      if (role === 'deliveryGuy') {
        const [averageRating, completionRate, totalDeliveries, successfulDeliveries] = await Promise.all([
          ratingContract.methods.getAverageRating(address).call(),
          ratingContract.methods.getCompletionRate(address).call(),
          ratingContract.methods.getTotalDeliveries(address).call(),
          ratingContract.methods.getSuccessfulDeliveries(address).call(),
        ]);
        statsData = { averageRating, completionRate, totalDeliveries, successfulDeliveries };
      } else if (role === 'sender') {
        const totalPackagesSent = await ratingContract.methods.getTotalPackagesSent(address).call();
        statsData = { totalPackagesSent };
      }
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching stats from contract:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch stats from contract.',
        variant: 'destructive',
      });
    }
  };
 
  const handleVerifyDelivery = async (packageId) => {
    try {
      await contract.methods.verifyAndCompleteDelivery(packageId, true, true).send({ from: address });
      toast({ title: 'Success', description: 'Delivery verified successfully.' });
      fetchPackages();
    } catch (error) {
      console.error('Error verifying delivery:', error);
      toast({
        title: 'Error',
        description: 'Failed to verify delivery.',
        variant: 'destructive',
      });
    }
  };

  const handleRateDelivery = async (packageId, rating) => {
    try {
      await ratingContract.methods.completeDelivery(packageId, rating).send({ from: address });
      toast({ title: 'Success', description: 'Rating submitted successfully.' });
      fetchStats();
    } catch (error) {
      console.error('Error rating delivery:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit rating.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          {role === "deliveryGuy" && (
            <>
              <p>Total Deliveries: {stats.totalDeliveries}</p>
              <p>Successful Deliveries: {stats.successfulDeliveries}</p>
              <p>Average Rating: {stats.averageRating}</p>
              <p>Completion Rate: {stats.completionRate}</p>
            </>
          )}
          {role === "sender" && <p>Total Packages Sent: {stats.totalPackagesSent}</p>}
        </CardContent>
      </Card>

      <div>
        <h2>Created Packages</h2>
        {createdPackages.map((pkg) => (
          <div key={pkg.id}>
            <p>Package ID: {pkg.id}</p>
            <p>Recipient: {pkg.recipient}</p>
            <p>Postage: {web3.utils.fromWei(pkg.postage, "ether")} ETH</p>
            <p>Status: {pkg.isDelivered ? "Delivered" : pkg.isPickedUp ? "In Transit" : "Pending"}</p>

            {/* Deposit Funds Dialog */}
            {!pkg.isPickedUp && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Deposit Funds</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds for Package {pkg.id}</DialogTitle>
                  </DialogHeader>
                  <Label>
                    Amount (ETH)
                    <Input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </Label>
                  <Button
                    onClick={() => handleDepositFunds(pkg.id, web3.utils.toWei(depositAmount, 'ether'))}
                  >
                    Confirm Deposit
                  </Button>
                </DialogContent>
              </Dialog>
            )}

            {/* Pickup Package Button */}
            <Button onClick={() => handlePickupPackage(pkg.id)}>Pickup Package</Button>
            {/* Deliver Package Button */}
            <Button onClick={() => handleDeliverPackage(pkg.id)}>Deliver Package</Button>
            {/* Verify Delivery Button */}
            <Button onClick={() => handleVerifyDelivery(pkg.id)}>Verify Delivery</Button>
          </div>
        ))}
      </div>

      <div>
        <h2>Picked Up Packages</h2>
        {pickedUpPackages.map((pkg) => (
          <div key={pkg.id}>
            <p>Package ID: {pkg.id}</p>
            <p>Recipient: {pkg.recipient}</p>
            <p>Postage: {web3.utils.fromWei(pkg.postage, "ether")} ETH</p>
            <p>Status: {pkg.isDelivered ? "Delivered" : "In Transit"}</p>
            <Button onClick={() => handleDeliverPackage(pkg.id)}>Deliver Package</Button>
          </div>
        ))}
      </div>

      <div>
        <h2>Delivered Packages</h2>
        {deliveredPackages.map((pkg) => (
          <div key={pkg.id}>
            <p>Package ID: {pkg.id}</p>
            <p>Recipient: {pkg.recipient}</p>
            <p>Postage: {web3.utils.fromWei(pkg.postage, "ether")} ETH</p>
            <Button onClick={() => handleRateDelivery(pkg.id, rating)}>Rate Delivery</Button>
            <Input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Rate (1-5)"
            />
          </div>
        ))}
      </div>

      {/* Create Package Form */}
      <div>
        <h2>Create a New Package</h2>
        <Input
          placeholder="Recipient Address"
          value={newPackage.recipient}
          onChange={(e) => setNewPackage({ ...newPackage, recipient: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Postage (ETH)"
          value={newPackage.postage}
          onChange={(e) => setNewPackage({ ...newPackage, postage: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Minimum Rating"
          value={newPackage.minRating}
          onChange={(e) => setNewPackage({ ...newPackage, minRating: e.target.value })}
        />
        <Button onClick={handleCreatePackage}>Create Package</Button>
      </div>
    </div>
  );
}
