'use client'

import React, { useState, useEffect } from 'react'
import { request, gql } from 'graphql-request'
import Web3 from 'web3'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PackageDeliveryAbi, RatingContractAbi } from '@/constants/ContractAbi'

const GRAPH_API_URL = 'https://api.thegraph.com/subgraphs/name/yourusername/yoursubgraph'
const CONTRACT_ADDRESS = '0x8BA77209a94d16CA5d4f7Bf3A8641927B69046aA'
const CONTRACT_ABI = PackageDeliveryAbi
const RATING_CONTRACT_ADDRESS = '0x2Bd08EE606CcB8f74bd3770e04C5c2F2dE17e25b'
const RATING_CONTRACT_ABI = RatingContractAbi

export default function Dashboard({ address, role }) {
  const [web3, setWeb3] = useState(null)
  const [contract, setContract] = useState(null)
  const [ratingContract, setRatingContract] = useState(null)
  const [packages, setPackages] = useState([])
  const [stats, setStats] = useState({})
  const [newPackage, setNewPackage] = useState({ recipient: '', postage: '', minRating: '' })
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [rating, setRating] = useState('')

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum)
        setWeb3(web3Instance)
        const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
        setContract(contractInstance)
        const ratingContractInstance = new web3Instance.eth.Contract(RATING_CONTRACT_ABI, RATING_CONTRACT_ADDRESS)
        setRatingContract(ratingContractInstance)
      }
    }
    initWeb3()
  }, [])

  useEffect(() => {
    if (address && role) {
      fetchPackages()
      fetchStats()
    }
  }, [address, role, web3])

  const fetchPackages = async () => {
    const query = gql`
      query GetPackages($address: String!, $role: String!) {
        packages(where: { ${role === 'sender' ? 'sender' : 'deliveryGuy'}: $address }) {
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
    `
    try {
      const data = await request(GRAPH_API_URL, query, { address: address.toLowerCase(), role })
      setPackages(data.packages)
    } catch (error) {
      console.error('Error fetching packages:', error)
      toast(
        { title: "Error", description: "Failed to fetch packages.", variant: "destructive" }
      )
    }
  }

  const fetchStats = async () => {
    if (!ratingContract) return

    try {
      let statsData = {}
      if (role === 'deliveryGuy') {
        const [averageRating, completionRate, totalDeliveries, successfulDeliveries] = await Promise.all([
          ratingContract.methods.getAverageRating(address).call(),
          ratingContract.methods.getCompletionRate(address).call(),
          ratingContract.methods.getTotalDeliveries(address).call(),
          ratingContract.methods.getSuccessfulDeliveries(address).call()
        ])
        statsData = { averageRating, completionRate, totalDeliveries, successfulDeliveries }
      } else if (role === 'sender') {
        const totalPackagesSent = await ratingContract.methods.getTotalPackagesSent(address).call()
        statsData = { totalPackagesSent }
      }
      setStats(statsData)
    } catch (error) {
      console.error('Error fetching stats:', error)
      toast(
        { title: "Error", description: "Failed to fetch stats.", variant: "destructive" }
      )
    }
  }

  const handleCreatePackage = async () => {
    try {
      await contract.methods.createPackage(Date.now(), // Using timestamp as package ID
      web3.utils.toWei(newPackage.postage, 'ether'), newPackage.minRating, newPackage.recipient).send({ from: address })
      toast({ title: "Success", description: "Package created successfully." })
      fetchPackages()
    } catch (error) {
      console.error('Error creating package:', error)
      toast(
        { title: "Error", description: "Failed to create package.", variant: "destructive" }
      )
    }
  }

  const handleDepositFunds = async (packageId, postage) => {
    try {
      await contract.methods.depositFunds(packageId).send({ from: address, value: postage })
      toast({ title: "Success", description: "Funds deposited successfully." })
      fetchPackages()
    } catch (error) {
      console.error('Error depositing funds:', error)
      toast(
        { title: "Error", description: "Failed to deposit funds.", variant: "destructive" }
      )
    }
  }

  const handlePickupPackage = async (packageId) => {
    try {
      await contract.methods.pickupPackage(packageId, address).send({ from: address })
      toast({ title: "Success", description: "Package picked up successfully." })
      fetchPackages()
    } catch (error) {
      console.error('Error picking up package:', error)
      toast(
        { title: "Error", description: "Failed to pick up package.", variant: "destructive" }
      )
    }
  }

  const handleDeliverPackage = async (packageId) => {
    try {
      await contract.methods.deliverPackage(packageId).send({ from: address })
      toast({ title: "Success", description: "Package delivered successfully." })
      fetchPackages()
    } catch (error) {
      console.error('Error delivering package:', error)
      toast(
        { title: "Error", description: "Failed to deliver package.", variant: "destructive" }
      )
    }
  }

  const handleVerifyDelivery = async (packageId) => {
    try {
      await contract.methods.verifyAndCompleteDelivery(packageId, true, true).send({ from: address })
      toast({ title: "Success", description: "Delivery verified successfully." })
      fetchPackages()
    } catch (error) {
      console.error('Error verifying delivery:', error)
      toast(
        { title: "Error", description: "Failed to verify delivery.", variant: "destructive" }
      )
    }
  }

  const handleRateDelivery = async (packageId, rating) => {
    try {
      await ratingContract.methods.completeDelivery(packageId, rating).send({ from: address })
      toast({ title: "Success", description: "Rating submitted successfully." })
      fetchStats()
    } catch (error) {
      console.error('Error rating delivery:', error)
      toast(
        { title: "Error", description: "Failed to submit rating.", variant: "destructive" }
      )
    }
  }

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Web3 Delivery App Dashboard</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Your Stats</CardTitle>
        </CardHeader>
        <CardContent>
          {role === 'deliveryGuy' ? (
            <>
              <p>Average Rating: {stats.averageRating}</p>
              <p>Completion Rate: {stats.completionRate}%</p>
              <p>Total Deliveries: {stats.totalDeliveries}</p>
              <p>Successful Deliveries: {stats.successfulDeliveries}</p>
            </>
          ) : (
            <p>Total Packages Sent: {stats.totalPackagesSent}</p>
          )}
        </CardContent>
      </Card>
      <Tabs defaultValue={role === 'sender' ? 'create' : 'available'}>
        <TabsList>
          {role === 'sender' && (
            <>
              <TabsTrigger value="create">Create Package</TabsTrigger>
              <TabsTrigger value="sent">Your Packages</TabsTrigger>
            </>
          )}
          {role === 'deliveryGuy' && (
            <>
              <TabsTrigger value="available">Available Packages</TabsTrigger>
              <TabsTrigger value="ongoing">Your Deliveries</TabsTrigger>
            </>
          )}
        </TabsList>

        {role === 'sender' && (
          <>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Package</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="recipient">Recipient Address</Label>
                      <Input
                        id="recipient"
                        value={newPackage.recipient}
                        onChange={(e) => setNewPackage({...newPackage, recipient: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="postage">Postage Amount (ETH)</Label>
                      <Input
                        id="postage"
                        type="number"
                        value={newPackage.postage}
                        onChange={(e) => setNewPackage({...newPackage, postage: e.target.value})} />
                    </div>
                    <div>
                      <Label htmlFor="minRating">Minimum Rating for Delivery Person</Label>
                      <Input
                        id="minRating"
                        type="number"
                        value={newPackage.minRating}
                        onChange={(e) => setNewPackage({...newPackage, minRating: e.target.value})} />
                    </div>
                    <Button onClick={handleCreatePackage}>Create Package</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sent">
              <Card>
                <CardHeader>
                  <CardTitle>Your Sent Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  {packages.map((pkg) => (
                    <div key={pkg.id} className="mb-4 p-4 border rounded">
                      <p>Package ID: {pkg.id}</p>
                      <p>Recipient: {pkg.recipient}</p>
                      <p>Status: {pkg.isDelivered ? 'Delivered' : pkg.isPickedUp ? 'In Transit' : 'Waiting for Pickup'}</p>
                      {!pkg.isPickedUp && (
                        <Button onClick={() => handleDepositFunds(pkg.id, pkg.postage)}>Deposit Funds</Button>
                      )}
                      {pkg.isDelivered && !pkg.isRated && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Rate Delivery</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rate Delivery</DialogTitle>
                              <DialogDescription>
                                Please rate the delivery from 1 to 5.
                              </DialogDescription>
                            </DialogHeader>
                            <Input
                              type="number"
                              min="1"
                              max="5"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)} />
                            <Button onClick={() => handleRateDelivery(pkg.id, rating)}>Submit Rating</Button>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}

        {role === 'deliveryGuy' && (
          <>
            <TabsContent value="available">
              <Card>
                <CardHeader>
                  <CardTitle>Available Packages</CardTitle>
                </CardHeader>
                <CardContent>
                  {packages.filter(pkg => !pkg.isPickedUp).map((pkg) => (
                    <div key={pkg.id} className="mb-4 p-4 border rounded">
                      <p>Package ID: {pkg.id}</p>
                      <p>Sender: {pkg.sender}</p>
                      <p>Recipient: {pkg.recipient}</p>
                      <p>Postage: {web3.utils.fromWei(pkg.postage, 'ether')} ETH</p>
                      <Button onClick={() => handlePickupPackage(pkg.id)}>Pick up Package</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="ongoing">
              <Card>
                <CardHeader>
                  <CardTitle>Your Ongoing Deliveries</CardTitle>
                </CardHeader>
                <CardContent>
                  {packages.filter(pkg => pkg.isPickedUp && !pkg.isDelivered).map((pkg) => (
                    <div key={pkg.id} className="mb-4 p-4 border rounded">
                      <p>Package ID: {pkg.id}</p>
                      <p>Sender: {pkg.sender}</p>
                      <p>Recipient: {pkg.recipient}</p>
                      <Button onClick={() => handleDeliverPackage(pkg.id)}>Deliver Package</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>)
  );
}