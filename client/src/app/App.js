import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

import Loader from "../components/Loader/loader.js";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';
import CartItemsProvider from '../Context/CartItemsProvider';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Wishlist from '../components/Wishlist';
import WishItemsProvider from '../Context/WishItemsProvider';
// import Checkout from '../components/Checkout/Checkout';
import SearchProvider from '../Context/SearchProvider';
import Toaster from '../components/Toaster/toaster';
import { ThemeProvider } from '../Context/ThemeContext';

import FaqList from '../Pages/Footer/Faq/FaqList.js';
import AccessiblityPage from '../Pages/Footer/Accessibility/Accessibility.js';
import RefundPage from '../Pages/Footer/Refund/Refund.js';
import ShippingPage from '../Pages/Footer/Shipping/Shipping.js';
import TermsConditions from '../components/Legal/TermsConditions/TermsConditions';
import PrivacyPolicy from '../components/Legal/PrivacyPolicy/PrivacyPolicy';

// ✅ Import RecentlyViewedSection
import RecentlyViewedSection from '../components/RecentlyViewedSection';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <CartItemsProvider>
          <WishItemsProvider>
            <SearchProvider>
              <Router>
                <div className="loader-wrapper">
                  <div className="wrapper">
                    <Loader />
                  </div>
                </div>
              </Router>
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
            <Router>
              <Header />
              <Routes>
                <Route index element={<Home />} />
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
                <Route path="/search/*" element={<SearchView />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/faq" element={<FaqList />} />
                <Route path="/accessibility" element={<AccessiblityPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/refund" element={<RefundPage />} />
                <Route path="/admin" element={<Wishlist />} />
              </Routes>

              {/* ✅ Render RecentlyViewedSection only once here */}
              <RecentlyViewedSection />

              <Footer />
            </Router>
          </SearchProvider>
        </WishItemsProvider>
      </CartItemsProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
