import {
  FundsDeposited as FundsDepositedEvent,
  FundsTransferred as FundsTransferredEvent,
  PackageCreated as PackageCreatedEvent,
  PackageDelivered as PackageDeliveredEvent,
  PackagePickedUp as PackagePickedUpEvent
} from "../generated/PackageDelivery/PackageDelivery"
import {
  FundsDeposited,
  FundsTransferred,
  PackageCreated,
  PackageDelivered,
  PackagePickedUp
} from "../generated/schema"

export function handleFundsDeposited(event: FundsDepositedEvent): void {
  let entity = new FundsDeposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.sender = event.params.sender
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsTransferred(event: FundsTransferredEvent): void {
  let entity = new FundsTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePackageCreated(event: PackageCreatedEvent): void {
  let entity = new PackageCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.packageId = event.params.packageId
  entity.sender = event.params.sender
  entity.recipient = event.params.recipient

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePackageDelivered(event: PackageDeliveredEvent): void {
  let entity = new PackageDelivered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.packageId = event.params.packageId
  entity.deliveryGuy = event.params.deliveryGuy
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePackagePickedUp(event: PackagePickedUpEvent): void {
  let entity = new PackagePickedUp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.packageId = event.params.packageId
  entity.deliveryGuy = event.params.deliveryGuy
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
