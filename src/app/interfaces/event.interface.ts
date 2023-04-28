import { User } from "./user.interface";

export interface Event {
  user: User;
  os: string;
  eventType: string;
  severity: string;
  time: string;
}
