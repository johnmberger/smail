import { Message } from './index';

export const formatMessages = (messages: any) => {
  // add fields to messages for functionality we're using
  return messages.map((message: any) => {
    return {
      ...message,
      starred: false,
      unread: false,
      deleted: false,
    };
  });
};

// TODO: write these
export const toggleStars = ({
  allMessages,
  messages,
  isStarred,
}: {
  allMessages: Message[];
  messages: Message[];
  isStarred: boolean;
}) => {};

export const toggleUnreads = ({
  allMessages,
  messages,
  isStarred,
}: {
  allMessages: Message[];
  messages: Message[];
  isStarred: boolean;
}) => {};
