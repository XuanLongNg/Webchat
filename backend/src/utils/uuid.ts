import { v4 as uuidv4 } from "uuid";

export default function uuid() {
  let buffer = Buffer.alloc(16);
  uuidv4(null, buffer, 0);
  let uuid = buffer.toString("hex");
  return uuid;
}
