import { Buffer } from 'buffer';

export default function convertIdToGid(nodeName, id) {
   return Buffer.from(`${nodeName}:${id}`).toString('base64');
}
