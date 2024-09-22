import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FundsDeposited,
  FundsTransferred,
  PackageCreated,
  PackageDelivered,
  PackagePickedUp
} from "../generated/PackageDelivery/PackageDelivery"

export function createFundsDepositedEvent(
  sender: Address,
  amount: BigInt
): FundsDeposited {
  let fundsDepositedEvent = changetype<FundsDeposited>(newMockEvent())

  fundsDepositedEvent.parameters = new Array()

  fundsDepositedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  fundsDepositedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsDepositedEvent
}

export function createFundsTransferredEvent(
  to: Address,
  amount: BigInt
): FundsTransferred {
  let fundsTransferredEvent = changetype<FundsTransferred>(newMockEvent())

  fundsTransferredEvent.parameters = new Array()

  fundsTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  fundsTransferredEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsTransferredEvent
}

export function createPackageCreatedEvent(
  packageId: BigInt,
  sender: Address,
  recipient: Address
): PackageCreated {
  let packageCreatedEvent = changetype<PackageCreated>(newMockEvent())

  packageCreatedEvent.parameters = new Array()

  packageCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "packageId",
      ethereum.Value.fromUnsignedBigInt(packageId)
    )
  )
  packageCreatedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  packageCreatedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )

  return packageCreatedEvent
}

export function createPackageDeliveredEvent(
  packageId: BigInt,
  deliveryGuy: Address,
  timestamp: BigInt
): PackageDelivered {
  let packageDeliveredEvent = changetype<PackageDelivered>(newMockEvent())

  packageDeliveredEvent.parameters = new Array()

  packageDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "packageId",
      ethereum.Value.fromUnsignedBigInt(packageId)
    )
  )
  packageDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "deliveryGuy",
      ethereum.Value.fromAddress(deliveryGuy)
    )
  )
  packageDeliveredEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return packageDeliveredEvent
}

export function createPackagePickedUpEvent(
  packageId: BigInt,
  deliveryGuy: Address,
  timestamp: BigInt
): PackagePickedUp {
  let packagePickedUpEvent = changetype<PackagePickedUp>(newMockEvent())

  packagePickedUpEvent.parameters = new Array()

  packagePickedUpEvent.parameters.push(
    new ethereum.EventParam(
      "packageId",
      ethereum.Value.fromUnsignedBigInt(packageId)
    )
  )
  packagePickedUpEvent.parameters.push(
    new ethereum.EventParam(
      "deliveryGuy",
      ethereum.Value.fromAddress(deliveryGuy)
    )
  )
  packagePickedUpEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return packagePickedUpEvent
}
