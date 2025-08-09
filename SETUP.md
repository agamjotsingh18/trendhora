# TrendHora Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Environment Variables
Create a `.env` file in the `client` directory with the following variables:

```env
# Supabase Configuration
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API URL
REACT_APP_BACKEND_URL=https://trendhora-api.onrender.com
```

### 3. Start Development Server
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## Features
- ✅ Merge conflicts resolved
- ✅ CSS variables for theming
- ✅ Responsive design
- ✅ Authentication system
- ✅ Shopping cart functionality
- ✅ Wishlist functionality
- ✅ Product catalog
- ✅ Search functionality

## Project Structure
```
client/
├── src/
│   ├── app/
│   ├── components/
│   ├── routes/
│   ├── Context/
│   ├── lib/
│   └── utils/
├── public/
└── package.json
```

## Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App 