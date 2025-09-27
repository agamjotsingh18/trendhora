import { ChatbotProvider as Provider } from './ChatbotContext';

const ChatbotProvider = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default ChatbotProvider;