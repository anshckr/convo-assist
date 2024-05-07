export enum Sender {
  AGENT = 'agent',
  CUSTOMER = 'customer',
}

export interface Message {
  content: string;
  sentAt: string;
  sender: Sender;
}

export enum ConversationStatus {
  OPEN = 'open',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export interface Conversation {
  id: string;
  createdAt: string;
  status: ConversationStatus;
  customer: string;
  messages: Message[];
}
