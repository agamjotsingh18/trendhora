# 💬 Trendhora Chatbot

A comprehensive, responsive chatbot designed to enhance the Trendhora shopping experience. The chatbot provides instant support for FAQs, product browsing assistance, account help, and search recommendations.

## 🚀 Features

### Core Functionality
- **💬 FAQ Support**: Answers common questions about orders, returns, shipping, and account issues
- **🛒 Product Browsing**: Helps users navigate categories and find products
- **👤 Account Assistance**: Provides help with login issues and account management  
- **🔍 Search Recommendations**: Offers popular search suggestions and search assistance
- **📱 Fully Responsive**: Works seamlessly on desktop and mobile devices
- **🌗 Theme Integration**: Matches Trendhora's light/dark theme system

### User Experience
- **Floating Action Button**: Unobtrusive access point
- **Smart Suggestions**: Context-aware quick response options
- **Typing Indicators**: Visual feedback during bot responses
- **Message History**: Maintains conversation context
- **Minimizable Interface**: Can be collapsed while staying accessible

## 🛠️ Technical Implementation

### Architecture
```
src/
├── Context/
│   ├── ChatbotContext.js      # State management and context
│   └── ChatbotProvider.js     # Provider wrapper component
└── components/
    └── Chatbot/
        ├── Chatbot.js         # Main chatbot component
        ├── Chatbot.css        # Styling and responsiveness
        ├── ChatbotService.js  # Business logic and responses
        ├── Chatbot.test.js    # Comprehensive test suite
        └── index.js           # Export module
```

### Key Technologies
- **React Hooks**: useState, useEffect, useRef, useContext
- **Context API**: Global state management
- **CSS3**: Advanced styling with CSS variables and animations
- **Responsive Design**: Mobile-first approach with media queries
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 💻 Usage

### Basic Integration
The chatbot is automatically integrated into the App.js and available globally across all pages:

```jsx
import ChatbotProvider from '../Context/ChatbotProvider';
import Chatbot from '../components/Chatbot';

function App() {
  return (
    <ChatbotProvider>
      {/* Other app content */}
      <Chatbot />
    </ChatbotProvider>
  );
}
```

### Using the Chatbot Context
```jsx
import { useChatbot } from '../Context/ChatbotContext';

function CustomComponent() {
  const { openChatbot, addMessage } = useChatbot();
  
  const handleHelpClick = () => {
    addMessage("I need help with my order", "user");
    openChatbot();
  };
}
```

## 🎯 Supported Queries

### Order & Shipping
- "Track my order" / "Order status" / "Where is my package"
- "Delivery time" / "Shipping information"
- "Expedite my order" / "Change delivery address"

### Returns & Refunds
- "Return policy" / "How to return items"
- "Refund status" / "Money back"
- "Exchange item" / "Start a return"

### Account Support
- "Login help" / "Forgot password" / "Can't sign in"
- "Account settings" / "Update profile"
- "Change email" / "Payment methods"

### Product Browsing
- "Show me products" / "Browse categories"
- "Men's fashion" / "Women's clothing" / "Kids items"
- "Sale products" / "Featured collections"

### Search Assistance
- "Find [item]" / "Search for [product]"
- "Popular items" / "Trending products"

## 🎨 Design System

### Color Scheme
The chatbot integrates with Trendhora's existing CSS variables:
- `--accent-color`: Primary brand color (FFE26E)
- `--bg-primary/secondary`: Background colors
- `--text-primary/secondary`: Text colors
- `--border-color`: Border styling

### Typography
- **Font Family**: Roboto (consistent with site)
- **Font Sizes**: 14px (messages), 16px (headers), 12px (timestamps)
- **Font Weights**: 400 (normal), 600 (headers)

### Spacing & Layout
- **Border Radius**: 16px (window), 18px (messages), 50% (buttons)
- **Padding**: 16px (standard), 12px (mobile)
- **Gaps**: 8px (small), 12px (medium), 16px (large)

## 📱 Responsive Behavior

### Desktop (768px+)
- Fixed position floating window (380x600px)
- Bottom-right corner placement
- Hover effects and animations
- Full feature set

### Mobile (<768px)
- Full-screen overlay interface
- Touch-optimized interactions
- Simplified animations for performance
- Accessible touch targets (44px minimum)

## ⚡ Performance Optimizations

### Lazy Loading
- Components load only when chatbot is opened
- Service responses cached for faster subsequent queries

### Memory Management
- Message history limited to prevent memory leaks
- Cleanup on component unmount
- Efficient re-renders with React.memo where appropriate

### Bundle Size
- Modular service architecture
- Tree-shaking compatible exports
- CSS variables for theme consistency

## 🧪 Testing

### Test Coverage
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Context and provider interactions  
- **Accessibility Tests**: ARIA compliance and keyboard navigation
- **Responsive Tests**: Mobile and desktop behavior

### Running Tests
```bash
npm test Chatbot.test.js
```

## 🔧 Customization

### Adding New FAQ Categories
Edit `ChatbotService.js`:

```javascript
static faqData = {
  newCategory: {
    "question keywords": {
      response: "Your response here",
      suggestions: ["Suggestion 1", "Suggestion 2"]
    }
  }
};
```

### Modifying Responses
Update the `processMessage` method in `ChatbotService.js` to handle new query types:

```javascript
static async processMessage(message) {
  // Add custom logic here
  if (message.includes('custom query')) {
    return this.getCustomResponse();
  }
}
```

### Styling Customization
Override CSS variables in `Chatbot.css`:

```css
.chatbot-container {
  --custom-accent: #your-color;
  --custom-radius: 12px;
}
```

## 🚀 Future Enhancements

### Planned Features
- **AI Integration**: Natural language processing
- **Voice Support**: Speech-to-text and text-to-speech
- **Multi-language**: Internationalization support
- **Analytics**: User interaction tracking
- **Live Chat Handoff**: Seamless transition to human agents

### API Integration Points
- Order tracking system integration
- Product catalog API connections
- User authentication system hooks
- Customer support ticket creation

## 📋 Browser Support

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Mobile Browsers
- ✅ Chrome Mobile
- ✅ Safari iOS
- ✅ Samsung Internet

## 🤝 Contributing

When contributing to the chatbot:

1. Follow existing code patterns and structure
2. Add comprehensive tests for new features
3. Update this README for significant changes
4. Ensure accessibility compliance
5. Test responsive behavior thoroughly

## 📞 Support

For technical issues or feature requests related to the chatbot:
- Create GitHub issues with detailed descriptions
- Include browser/device information
- Provide steps to reproduce any bugs

---

*The Trendhora Chatbot is designed to grow with the platform, providing an enhanced shopping experience through intelligent, contextual assistance.*