import { Echo } from '../generated/Echoer/Echoer';
import { NoteAccount as NoteAccountEntity } from '../generated/schema';

export function handleEcho(event: Echo): void {
  let entity = new NoteAccountEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  entity.index = event.logIndex;
  entity.address = event.params.who;
  entity.encryptedAccount = event.params.data;

  entity.save();
}
