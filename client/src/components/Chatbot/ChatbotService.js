class ChatbotService {
  
  // FAQ Data Structure
  static faqData = {
    // Order & Shipping FAQs
    order: {
      "track my order": {
        response: "To track your order:\n\n**Step 1:** Go to your [account page](/account/me)\n**Step 2:** Click on 'Order History'\n**Step 3:** Find your order and click 'Track'\n\nYou can also use your order confirmation email to track your package directly with the carrier. Need your order number? I can help you find it!",
        suggestions: ["Find my order number", "Contact support", "Browse products", "Delivery times"]
      },
      "order status": {
        response: "Here's how to check your order status:\n\n📦 **Preparing:** Order confirmed, getting ready\n🚛 **Shipped:** On the way to you\n📍 **Out for Delivery:** Arriving today\n✅ **Delivered:** At your doorstep\n\nFor specific status updates, please check your [account dashboard](/account/me) or provide your order number.",
        suggestions: ["Track specific order", "Delivery issues", "Change delivery address"]
      },
      "delivery time": {
        response: "**Delivery Times:**\n\n🚀 **Express:** 1-2 business days\n📦 **Standard:** 3-5 business days\n🌍 **International:** 7-14 business days\n\nDelivery times may vary based on your location and product availability. Free standard shipping on orders over $75!",
        suggestions: ["Expedite my order", "International shipping", "Shipping costs"]
      }
    },

    // Returns & Refunds
    returns: {
      "return policy": {
        response: "**Our Return Policy:**\n\n✅ **30-day return window** from delivery\n✅ **Free returns** on most items\n✅ **Original condition** required\n✅ **Tags attached** for clothing\n\n**Easy Returns:**\n1. Visit [Returns Center](/refund)\n2. Select your order\n3. Print return label\n4. Drop off at any carrier location\n\nRefunds process within 5-7 business days after we receive your return.",
        suggestions: ["Start a return", "Refund status", "Exchange item", "Return without receipt"]
      },
      "refund": {
        response: "**Refund Information:**\n\n💳 **Refund to original payment method**\n⏱️ **Processing time:** 5-7 business days\n📧 **Email confirmation** when processed\n\n**What's refunded:**\n- Item cost\n- Original shipping (if return is our fault)\n- Tax\n\nReturn shipping costs are deducted unless the return is due to our error.",
        suggestions: ["Check refund status", "Return without receipt", "Partial refund"]
      }
    },

    // Account Help
    account: {
      "login help": {
        response: "**Having trouble logging in?** Here are common solutions:\n\n🔑 **Forgot Password?**\n- Click [Reset Password](/forgot-password)\n- Check your email for reset link\n\n📧 **Can't find account?**\n- Try different email addresses\n- Check if you signed up with social media\n\n🔒 **Account locked?**\n- Wait 15 minutes and try again\n- Contact support if problem persists\n\nNeed to create a new account? [Sign up here](/account/register)",
        suggestions: ["Reset password", "Create new account", "Contact support", "Sign up with Google"]
      },
      "account issue": {
        response: "I'm here to help with your account! Common issues:\n\n👤 **Profile Updates:** [Manage Account](/account/manage)\n📧 **Email Changes:** Update in account settings\n🏠 **Address Book:** Add/edit shipping addresses\n💳 **Payment Methods:** Add or remove cards\n🔔 **Notifications:** Manage email preferences\n\nWhat specific account issue can I help you with?",
        suggestions: ["Update profile", "Change email", "Manage addresses", "Payment methods"]
      }
    },

    // Shipping Information
    shipping: {
      "shipping info": {
        response: "**Shipping Information:**\n\n🚚 **Free Standard Shipping** on orders $75+\n💨 **Express options** available at checkout\n🌍 **International shipping** to 50+ countries\n📦 **Secure packaging** for all orders\n\n**Shipping Costs:**\n- Standard: $6.99 (Free over $75)\n- Express: $12.99\n- Overnight: $24.99\n\nAll orders ship within 1-2 business days. Track your package with the provided tracking number!",
        suggestions: ["International shipping", "Expedited shipping", "Free shipping threshold"]
      }
    }
  };

  // Product Categories
  static categories = [
    { name: "Men's Fashion", path: "/category/men", description: "Trending styles for men" },
    { name: "Women's Fashion", path: "/category/women", description: "Latest women's collections" },
    { name: "Kids Collection", path: "/category/kids", description: "Stylish options for children" },
    { name: "Featured Items", path: "/shop", description: "Curated premium selections" },
    { name: "Sale Items", path: "/shop?filter=sale", description: "Best deals and discounts" }
  ];

  // Popular search terms
  static popularSearches = [
    "summer dresses", "denim jackets", "sneakers", "handbags", "sunglasses",
    "formal wear", "casual shirts", "designer shoes", "accessories", "winter coats"
  ];

  // Process incoming message and return appropriate response
  static async processMessage(message) {
    const lowercaseMessage = message.toLowerCase().trim();
    
    // Check for greetings
    if (this.isGreeting(lowercaseMessage)) {
      return this.getGreetingResponse();
    }
    
    // Check for FAQ matches
    const faqResponse = this.findFAQMatch(lowercaseMessage);
    if (faqResponse) {
      return faqResponse;
    }
    
    // Check for product browsing requests
    if (this.isProductBrowsingRequest(lowercaseMessage)) {
      return this.getProductBrowsingResponse(lowercaseMessage);
    }
    
    // Check for search requests
    if (this.isSearchRequest(lowercaseMessage)) {
      return this.getSearchResponse(lowercaseMessage);
    }
    
    // Check for category requests
    if (this.isCategoryRequest(lowercaseMessage)) {
      return this.getCategoryResponse(lowercaseMessage);
    }
    
    // Default response with helpful suggestions
    return this.getDefaultResponse();
  }

  static isGreeting(message) {
    const greetings = ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  static getGreetingResponse() {
    const greetings = [
      "Hello! 👋 Welcome to Trendhora! How can I assist you today?",
      "Hi there! 🛍️ I'm here to help you with your shopping experience. What can I do for you?",
      "Hey! 😊 Thanks for visiting Trendhora. How can I make your shopping easier today?"
    ];
    
    return {
      content: greetings[Math.floor(Math.random() * greetings.length)],
      suggestions: ["Track my order", "Browse products", "Account help", "Return policy"]
    };
  }

  static findFAQMatch(message) {
    // Search through all FAQ categories
    for (const category of Object.values(this.faqData)) {
      for (const [question, answer] of Object.entries(category)) {
        if (message.includes(question) || this.similarQuestions(message, question)) {
          return {
            content: answer.response,
            suggestions: answer.suggestions
          };
        }
      }
    }
    return null;
  }

  static similarQuestions(message, question) {
    const keywords = {
      "track my order": ["track", "order", "tracking", "shipment", "package"],
      "order status": ["status", "order", "where is", "shipped"],
      "delivery time": ["delivery", "shipping time", "how long", "when will"],
      "return policy": ["return", "exchange", "send back"],
      "refund": ["refund", "money back", "cancel order"],
      "login help": ["login", "sign in", "password", "access"],
      "account issue": ["account", "profile", "settings"],
      "shipping info": ["shipping", "delivery", "freight", "postage"]
    };

    const questionKeywords = keywords[question] || [];
    return questionKeywords.some(keyword => message.includes(keyword));
  }

  static isProductBrowsingRequest(message) {
    const browsingKeywords = ['browse', 'show me', 'looking for', 'find', 'shop', 'products'];
    return browsingKeywords.some(keyword => message.includes(keyword));
  }

  static getProductBrowsingResponse(message) {
    let response = "🛍️ **I'd love to help you find the perfect items!** Here are our main categories:\n\n";
    
    this.categories.forEach(category => {
      response += `**[${category.name}](${category.path})** - ${category.description}\n`;
    });
    
    response += "\nWhat type of products are you most interested in?";
    
    return {
      content: response,
      suggestions: ["Men's fashion", "Women's fashion", "Kids items", "Sale products", "Featured collections"]
    };
  }

  static isSearchRequest(message) {
    const searchKeywords = ['search', 'find', 'look for', 'looking for'];
    return searchKeywords.some(keyword => message.includes(keyword));
  }

  static getSearchResponse(message) {
    const suggestions = this.popularSearches.slice(0, 4);
    
    return {
      content: "🔍 **Let me help you find what you're looking for!** \n\nYou can use our [search feature](/search) to find specific items. Here are some popular searches to get you started:",
      suggestions: [...suggestions, "Advanced search"]
    };
  }

  static isCategoryRequest(message) {
    return this.categories.some(category => 
      message.includes(category.name.toLowerCase()) || 
      category.name.toLowerCase().includes(message)
    );
  }

  static getCategoryResponse(message) {
    const matchedCategory = this.categories.find(category => 
      message.includes(category.name.toLowerCase()) || 
      category.name.toLowerCase().includes(message)
    );

    if (matchedCategory) {
      return {
        content: `Great choice! 🎉 Check out our **${matchedCategory.name}** section.\n\n${matchedCategory.description}\n\n[Browse ${matchedCategory.name}](${matchedCategory.path})`,
        suggestions: ["View all categories", "Sale items", "Featured products", "Search specific item"]
      };
    }

    return this.getDefaultResponse();
  }

  static getDefaultResponse() {
    return {
      content: "I'm here to help! 😊 I can assist you with:\n\n📦 **Order tracking & status**\n🔄 **Returns & refunds**\n🛍️ **Product recommendations**\n👤 **Account support**\n🔍 **Finding specific items**\n\nWhat would you like help with?",
      suggestions: ["Track my order", "Return policy", "Browse products", "Account help"]
    };
  }

  // Utility method to extract order number from message
  static extractOrderNumber(message) {
    const orderRegex = /#?(\d{6,})/;
    const match = message.match(orderRegex);
    return match ? match[1] : null;
  }

  // Method to generate personalized product recommendations
  static getPersonalizedRecommendations(userPreferences = {}) {
    const recommendations = {
      trending: ["Summer dresses", "Denim jackets", "Sneakers collection"],
      newArrivals: ["Designer handbags", "Premium sunglasses", "Casual wear"],
      featured: ["Limited edition items", "Seasonal collections", "Best sellers"]
    };

    return recommendations;
  }
}

export default ChatbotService;