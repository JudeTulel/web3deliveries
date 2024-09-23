'use client'

import { useState, useEffect } from 'react'
import Web3 from 'web3'
import Dashboard from '@/components/dashboard'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { toast } from '@/hooks/use-toast'

export default function Home() {
  const [address, setAddress] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        if (accounts.length > 0) {
          setAddress(accounts[0])
        }
      } catch (error) {
        console.error('Failed to check connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const web3 = new Web3(window.ethereum)
        const accounts = await web3.eth.getAccounts()
        setAddress(accounts[0])
        toast({
          title: "Wallet Connected",
          description: `Connected with address: ${accounts[0]}`,
        })
      } catch (error) {
        console.error('Failed to connect wallet:', error)
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        })
      }
    } else {
      toast({
        title: "MetaMask Not Detected",
        description: "Please install MetaMask to use this app.",
        variant: "destructive",
      })
    }
  }

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole)
    toast({
      title: "Role Selected",
      description: `You have selected the role: ${selectedRole === 'user' ? 'User' : 'Delivery Person'}`,
    })
  }

  if (!address) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Welcome to Web3 Delivery App</CardTitle>
            <CardDescription>Connect your wallet to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={connectWallet} className="w-full">Connect Wallet</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!role) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Choose Your Role</CardTitle>
            <CardDescription>Are you a user or a delivery person?</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup onValueChange={handleRoleSelection} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User (Sender/Recipient)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deliveryGuy" id="deliveryGuy" />
                <Label htmlFor="deliveryGuy">Delivery Person</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <Dashboard address={address} role={role} />
}
