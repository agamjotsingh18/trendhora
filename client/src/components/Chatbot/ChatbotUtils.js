// Chatbot utility functions and helpers

export class ChatbotUtils {
  
  // Format text with basic markdown-style formatting
  static formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/`(.*?)`/g, '<code>$1</code>');
  }

  // Detect if message is a question
  static isQuestion(message) {
    const questionWords = ['what', 'how', 'when', 'where', 'why', 'which', 'who'];
    const questionMarks = message.includes('?');
    const startsWithQuestion = questionWords.some(word => 
      message.toLowerCase().startsWith(word)
    );
    return questionMarks || startsWithQuestion;
  }

  // Extract keywords from user message
  static extractKeywords(message) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(' ')
      .filter(word => word.length > 2 && !stopWords.includes(word));
  }

  // Calculate message similarity (simple implementation)
  static calculateSimilarity(message1, message2) {
    const words1 = this.extractKeywords(message1);
    const words2 = this.extractKeywords(message2);
    
    const commonWords = words1.filter(word => words2.includes(word));
    const totalWords = new Set([...words1, ...words2]).size;
    
    return totalWords > 0 ? commonWords.length / totalWords : 0;
  }

  // Generate contextual suggestions based on current conversation
  static generateContextualSuggestions(messages, currentTopic = null) {
    const baseSuggestions = [
      "Track my order",
      "Browse products", 
      "Account help",
      "Return policy"
    ];

    // If user asked about orders, suggest related topics
    const lastUserMessage = messages
      .filter(m => m.type === 'user')
      .pop();

    if (lastUserMessage) {
      const message = lastUserMessage.content.toLowerCase();
      
      if (message.includes('order') || message.includes('track')) {
        return ["Check order status", "Delivery information", "Change address", "Contact support"];
      }
      
      if (message.includes('return') || message.includes('refund')) {
        return ["Start a return", "Refund policy", "Exchange item", "Return status"];
      }
      
      if (message.includes('account') || message.includes('login')) {
        return ["Reset password", "Update profile", "Payment methods", "Order history"];
      }
      
      if (message.includes('product') || message.includes('shop')) {
        return ["Men's fashion", "Women's fashion", "Sale items", "New arrivals"];
      }
    }

    return baseSuggestions;
  }

  // Validate and sanitize user input
  static sanitizeInput(input) {
    return input
      .trim()
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, '')
      .substring(0, 500); // Limit length
  }

  // Generate unique message ID
  static generateMessageId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Format timestamp for display
  static formatTimestamp(timestamp, format = 'time') {
    const date = new Date(timestamp);
    
    switch (format) {
      case 'time':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'date':
        return date.toLocaleDateString();
      case 'full':
        return date.toLocaleString();
      default:
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  // Detect user intent from message
  static detectIntent(message) {
    const intents = {
      ORDER_TRACKING: ['track', 'order', 'shipment', 'package', 'delivery'],
      RETURN_REFUND: ['return', 'refund', 'exchange', 'send back'],
      ACCOUNT_HELP: ['login', 'password', 'account', 'profile', 'sign in'],
      PRODUCT_SEARCH: ['find', 'search', 'looking for', 'show me'],
      SHIPPING_INFO: ['shipping', 'delivery time', 'postage'],
      GREETING: ['hi', 'hello', 'hey', 'good morning', 'good afternoon']
    };

    const lowerMessage = message.toLowerCase();
    
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }
    
    return 'GENERAL';
  }

  // Store conversation for analytics (privacy-conscious)
  static logConversation(messages, sessionId) {
    // Only log non-PII data for analytics
    const analyticsData = {
      sessionId,
      messageCount: messages.length,
      intents: messages
        .filter(m => m.type === 'user')
        .map(m => this.detectIntent(m.content)),
      timestamp: new Date().toISOString(),
      duration: this.calculateSessionDuration(messages)
    };
    
    // In a real implementation, this would send to analytics service
    console.log('Chatbot Analytics:', analyticsData);
    
    return analyticsData;
  }

  // Calculate session duration
  static calculateSessionDuration(messages) {
    if (messages.length < 2) return 0;
    
    const firstMessage = messages[0];
    const lastMessage = messages[messages.length - 1];
    
    return new Date(lastMessage.timestamp) - new Date(firstMessage.timestamp);
  }

  // Export conversation for customer service
  static exportConversation(messages) {
    const conversationText = messages
      .map(message => {
        const time = this.formatTimestamp(message.timestamp, 'full');
        const sender = message.type === 'user' ? 'Customer' : 'Chatbot';
        return `[${time}] ${sender}: ${message.content}`;
      })
      .join('\n');
    
    return {
      text: conversationText,
      json: messages,
      summary: this.generateConversationSummary(messages)
    };
  }

  // Generate conversation summary
  static generateConversationSummary(messages) {
    const userMessages = messages.filter(m => m.type === 'user');
    const topics = userMessages.map(m => this.detectIntent(m.content));
    const uniqueTopics = [...new Set(topics)];
    
    return {
      totalMessages: messages.length,
      userQueries: userMessages.length,
      mainTopics: uniqueTopics,
      resolved: true, // Could be determined by sentiment analysis
      duration: this.calculateSessionDuration(messages)
    };
  }

  // Check if chatbot should escalate to human
  static shouldEscalateToHuman(messages) {
    const recentUserMessages = messages
      .filter(m => m.type === 'user')
      .slice(-3);
    
    const frustrationIndicators = [
      'frustrated', 'angry', 'not working', 'not helpful', 
      'speak to human', 'representative', 'manager', 'not understanding'
    ];
    
    return recentUserMessages.some(message =>
      frustrationIndicators.some(indicator =>
        message.content.toLowerCase().includes(indicator)
      )
    );
  }

  // Get quick actions based on current context
  static getQuickActions(currentPath) {
    const pathActions = {
      '/shop': ['Find specific item', 'Filter products', 'Check sizes'],
      '/account': ['Reset password', 'Update profile', 'Order history'],
      '/cart': ['Apply coupon', 'Shipping options', 'Payment help'],
      '/checkout': ['Payment issues', 'Delivery options', 'Order summary']
    };
    
    return pathActions[currentPath] || ['Get help', 'Browse products', 'Contact support'];
  }
}

// Additional helper functions for specific use cases

export const MessageTypes = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system',
  ERROR: 'error'
};

export const ChatbotEvents = {
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  CHATBOT_OPENED: 'chatbot_opened',
  CHATBOT_CLOSED: 'chatbot_closed',
  SUGGESTION_CLICKED: 'suggestion_clicked',
  ESCALATION_REQUESTED: 'escalation_requested'
};

// Event tracking utilities
export class ChatbotAnalytics {
  static trackEvent(event, data = {}) {
    // In production, this would integrate with analytics service
    const eventData = {
      event,
      timestamp: new Date().toISOString(),
      ...data
    };
    
    console.log('Chatbot Event:', eventData);
    
    // Could send to Google Analytics, Mixpanel, etc.
    // window.gtag?.('event', event, eventData);
  }
  
  static trackUserSatisfaction(rating, feedback) {
    this.trackEvent(ChatbotEvents.USER_FEEDBACK, {
      rating,
      feedback,
      sessionId: Date.now()
    });
  }
}

export default ChatbotUtils;