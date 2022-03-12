import { Withdrawal, Deposit } from '../generated';
import { Withdrawal as WithdrawalEntity, Deposit as DepositEntity } from '../generated/schema';

import { contractsToInstances } from './contractsToInstances';

export function handleWithdrawal(event: Withdrawal): void {
  let entity = new WithdrawalEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  let result = contractsToInstances.get(event.address.toHexString()).split('-');

  entity.amount = result[1];
  entity.currency = result[0];

  entity.to = event.params.to;
  entity.fee = event.params.fee;
  entity.index = event.logIndex;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.nullifier = event.params.nullifierHash;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDeposit(event: Deposit): void {
  let entity = new DepositEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  let result = contractsToInstances.get(event.address.toHexString()).split('-');

  entity.amount = result[1];
  entity.currency = result[0];

  entity.from = event.transaction.from;
  entity.index = event.params.leafIndex;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.commitment = event.params.commitment;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
