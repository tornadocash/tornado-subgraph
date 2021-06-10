import { EncryptedNote } from '../generated/Proxy/Proxy';
import { EncryptedNote as EncryptedNoteEntity } from '../generated/schema';

export function handleEncryptedNote(event: EncryptedNote): void {
  let entity = new EncryptedNoteEntity(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  entity.index = event.logIndex;
  entity.blockNumber = event.block.number;
  entity.transactionHash = event.transaction.hash;
  entity.encryptedNote = event.params.encryptedNote;

  if (event.params.encryptedNote.toHexString() != '0x') {
    entity.save();
  }
}
