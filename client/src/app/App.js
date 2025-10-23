import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Loader from "../components/Loader/loader.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../routes/Home";
import About from "../routes/About";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ManageAccount from "../components/Account/ManageAccount/ManageAccount";
import MyAccount from "../components/Account/MyAccount/MyAccount";
import Shop from "../components/Shop/Shop";
import ItemView from "../routes/ItemView";
import CategoryView from "../routes/CategoryView";
import SearchView from "../routes/Search";
import CartItemsProvider from "../Context/CartItemsProvider";
import Login from "../components/Authentication/Login/Login";
import Register from "../components/Authentication/Register/Register";
import Wishlist from "../components/Wishlist";
import WishItemsProvider from "../Context/WishItemsProvider";
import SearchProvider from "../Context/SearchProvider";
import Toaster from "../components/Toaster/toaster";
import { Toaster as HotToaster } from 'react-hot-toast';
import { ThemeProvider } from "../Context/ThemeContext";
import ChatbotProvider from '../Context/ChatbotProvider';
import Chatbot from '../components/Chatbot';
import { ComparisonProvider } from "../Context/ComparisonContext";
import ComparisonModal from "../components/Comparison/ComparisonModal";
import ComparisonButton from "../components/Comparison/ComparisonButton";

import FaqList from "../Pages/Footer/Faq/FaqList.js";
import AccessiblityPage from "../Pages/Footer/Accessibility/Accessibility.js";
import RefundPage from "../Pages/Footer/Refund/Refund.js";
import ShippingPage from "../Pages/Footer/Shipping/Shipping.js";
import TermsConditions from "../components/Legal/TermsConditions/TermsConditions";
import PrivacyPolicy from "../components/Legal/PrivacyPolicy/PrivacyPolicy";
import ForgotPassword from '../components/Authentication/ForgotPassword/ForgotPassword';
import ResetPassword from '../components/Authentication/ResetPassword/ResetPassword';
import ContactUs from "../routes/ContactUs";
import RecentlyViewedSection from "../components/RecentlyViewedSection";
import PageNotFound from '../components/PageNotFound/PageNotFound';
import InventoryManagement from '../components/Admin/InventoryManagement/InventoryManagement';
import ItemCreation from '../components/Admin/ItemCreation/ItemCreation';
import CartPage from "../routes/CartPage";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Reduced from 3000ms to 1000ms
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <CartItemsProvider>
          <WishItemsProvider>
            <SearchProvider>
              <ChatbotProvider>
                <ComparisonProvider>
                  <Router>
                  <div className="loader-wrapper">
                    <div className="wrapper">
                      <Loader />
                    </div>
                  </div>
                  </Router>
                </ComparisonProvider>
              </ChatbotProvider>
            </SearchProvider>
          </WishItemsProvider>
        </CartItemsProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <CartItemsProvider>
        <WishItemsProvider>
          <SearchProvider>
            <ChatbotProvider>
              <ComparisonProvider>
                <Router>
                <Header />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/account">
                    <Route path="me" element={<MyAccount />} />
                    <Route path="manage" element={<ManageAccount />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="*" element={<Login />} />
                  </Route>
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/category">
                    <Route path=":id" element={<CategoryView />} />
                  </Route>
                  <Route path="/item">
                    <Route path="men/:id" element={<ItemView />} />
                    <Route path="women/:id" element={<ItemView />} />
                    <Route path="kids/:id" element={<ItemView />} />
                    <Route path="featured/:id" element={<ItemView />} />
                  </Route>
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<CartPage />} />

                  <Route path="/search/*" element={<SearchView />} />
                  <Route path="/terms" element={<TermsConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/faq" element={<FaqList />} />
                  <Route path="/accessibility" element={<AccessiblityPage />} />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/refund" element={<RefundPage />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password/:token" element={<ResetPassword />} />
                  <Route path="/admin/inventory" element={<InventoryManagement />} />
                  <Route path="/admin/create-item" element={<ItemCreation />} />
                  <Route path="/admin" element={<Wishlist />} />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>

                <RecentlyViewedSection />
                <Chatbot />
                <ComparisonModal />
                <ComparisonButton />
                <Footer />
                </Router>
              </ComparisonProvider>
            </ChatbotProvider>
          </SearchProvider>
        </WishItemsProvider>
      </CartItemsProvider>
      <Toaster />
      {/* react-hot-toast Toaster (shows toast.success/toast.error from react-hot-toast) */}
      <HotToaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;