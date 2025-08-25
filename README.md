# Trendhora 🛍️
### A Modern Full-Stack E-commerce Platform

<div align="center">

<!-- Alternative if you want to control size -->
<img src="https://raw.githubusercontent.com/agamjotsingh18/trendhora/main/client/src/asset/brand/logo.png" alt="Trendhora Logo" width="500" height="200">


[![MIT License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/agamjotsingh18/trendhora?style=for-the-badge)](https://github.com/agamjotsingh18/trendhora/graphs/contributors)
[![Stars](https://img.shields.io/github/stars/agamjotsingh18/trendhora?style=for-the-badge)](https://github.com/agamjotsingh18/trendhora/stargazers)
[![Forks](https://img.shields.io/github/forks/agamjotsingh18/trendhora?style=for-the-badge)](https://github.com/agamjotsingh18/trendhora/network/members)

*Welcome to **Trendhora** – your gateway to a seamless online shopping experience built with the MERN stack.*

[Report Bug](https://github.com/agamjotsingh18/trendhora/issues) • [Request Feature](https://github.com/agamjotsingh18/trendhora/issues)

</div>

---

## 🌟 Features

### 👤 **For Buyers**
- 🛒 **Explore & Shop** - Browse through an extensive range of products across various categories
- 📱 **User-Friendly Interface** - Enjoy a smooth shopping experience with an intuitive and responsive design

### 🔧 **For Admins**
- 🛠️ **Manage Marketplace** - Effortlessly control and update product listings
- 👥 **Customer Account Management** - Handle customer accounts and ensure smooth operation of the marketplace

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Backend | Database | 
|----------|---------|----------|
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) |
| ![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white) | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logoColor=white) |

</div>

---

## 🚀 Quick Start

### Prerequisites

Make sure you have these installed on your machine:

```bash
node --version    # v16.0.0 or higher
npm --version     # v8.0.0 or higher
```

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/agamjotsingh18/trendhora.git
   cd trendhora
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies  
   cd ../client
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
   ```

4. **Database Setup**
   ```bash
   # Navigate to server directory
   cd server
   
   # Seed the database with sample data
   npm run seed
   ```

5. **Start the Application**
   ```bash
   # Terminal 1: Start the backend server
   cd server
   npm run dev
   
   # Terminal 2: Start the frontend (in a new terminal)
   cd client  
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

---

## 📁 Project Structure

```
trendhora/
├── client/                 # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Database config
│   └── package.json
├── README.md
└── LICENSE
```

---

## 🔧 Available Scripts

### Client
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Server
```bash
npm run dev        # Start with nodemon
npm start          # Start production server
npm run seed       # Populate database with sample data
npm test           # Run tests
```

---

## 📱 Screenshots

<div align="center">

<img src="https://raw.githubusercontent.com/agamjotsingh18/trendhora/main/client/src/asset/img/Screenshot%20(45).png" alt="Screenshot 45" width="1920" height="1080" />
<img src="https://raw.githubusercontent.com/agamjotsingh18/trendhora/main/client/src/asset/img/dark_mode.png" alt="Dark Mode" width="1920" height="1080" />
<img src="https://raw.githubusercontent.com/agamjotsingh18/trendhora/main/client/src/asset/img/shop_section.png" alt="Shop Section" width="1920" height="1080" />


</div>

---


## 🤝 Contributing

We love contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contributors

<a href="https://github.com/agamjotsingh18/trendhora/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=agamjotsingh18/trendhora" />
</a>

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please check our [Issues](https://github.com/agamjotsingh18/trendhora/issues) page.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Material-UI for the beautiful component library
- MongoDB for the flexible database solution
- The open-source community for inspiration and support

---

## 📧 Connect With Us

<div align="center">

### Project Maintainer: Agamjot Singh

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/agamjot-singh/)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/_agamjotsingh)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/agamjotsingh18)

### ⭐ If this project helped you, please give it a star!

</div>

---

<div align="center">
  <h3>Made with ❤️ by developers, for developers</h3>
</div>
