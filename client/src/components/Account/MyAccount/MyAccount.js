import React, { useEffect, useState, useContext } from 'react';
import './MyAccount.css';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useTheme } from '../../../Context/ThemeContext';
import { CartItemsContext } from '../../../Context/CartItemsContext';
import { WishItemsContext } from '../../../Context/WishItemsContext';

const MyAccount = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCtx = useContext(CartItemsContext);
  const wishCtx = useContext(WishItemsContext);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        setLoading(true);
        
        // First, check if user is logged in with JWT token
        const authToken = localStorage.getItem('authToken');
        
        if (authToken) {
          // User logged in with JWT (username/password)
          try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/me`, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const userData = await response.json();
              // Set user data from JWT backend
              // Backend returns { success: true, data: { username, email, ... } }
              const userInfo = userData.data;
              setUser({
                email: userInfo.email,
                user_metadata: {
                  full_name: userInfo.username,
                  avatar_url: null
                }
              });
              
              // Fetch user's orders from backend
              const ordersResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orders/my-orders`, {
                headers: {
                  'Authorization': `Bearer ${authToken}`,
                  'Content-Type': 'application/json'
                }
              });
              
              if (ordersResponse.ok) {
                const ordersData = await ordersResponse.json();
                setOrders(ordersData.data || []);
              }
            }
          } catch (error) {
            console.error('Error fetching JWT user data:', error);
          }
        } else {
          // Fallback to Supabase OAuth if no JWT token
          const { data: { user: supaUser } } = await supabase.auth.getUser();
          if (supaUser) {
            setUser(supaUser);
          }
          
          // Fetch orders from backend if user has a Supabase session
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token) {
            try {
              // Fetch user orders
              const ordersResponse = await fetch('/api/orders/my-orders', {
                headers: {
                  'Authorization': `Bearer ${session.access_token}`,
                  'Content-Type': 'application/json'
                }
              });
              
              if (ordersResponse.ok) {
                const ordersData = await ordersResponse.json();
                setOrders(ordersData.data || []);
              }
              
              // Fetch order statistics
              const statsResponse = await fetch('/api/orders/stats', {
                headers: {
                  'Authorization': `Bearer ${session.access_token}`,
                  'Content-Type': 'application/json'
                }
              });
              
              if (statsResponse.ok) {
                const statsData = await statsResponse.json();
                setOrderStats(statsData.data);
              }
            } catch (error) {
              console.log('Orders not available yet or user not in backend:', error);
              // This is okay - user might not have backend account yet
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserAndOrders();
  }, []);

  // Real data from contexts and backend
  const userStats = {
    orders: orderStats?.totalOrders || orders.length || 0,
    wishlist: wishCtx.items.length,
    cart: cartCtx.items.length,
    satisfaction: '98%' // This could be calculated from reviews in the future
  };

  // Generate recent activity based on real data
  const recentActivity = [
    // Add recent orders from backend
    ...orders.slice(0, 2).map(order => ({
      title: `Order ${order.orderNumber}`,
      date: new Date(order.createdAt).toISOString().split('T')[0],
      status: order.status
    })),
    ...(wishCtx.items.length > 0 ? [{
      title: `Wishlist (${wishCtx.items.length} items)`,
      date: new Date().toISOString().split('T')[0],
      status: 'updated'
    }] : []),
    ...(cartCtx.items.length > 0 ? [{
      title: `Cart (${cartCtx.items.length} items)`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    }] : [])
  ].slice(0, 4); // Limit to 4 recent activities

  const tabLabels = {
    overview: '📊 Overview',
    orders: '🛍️ Orders', 
    profile: '👤 Profile',
    settings: '⚙️ Settings'
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`modern-profile-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Profile Header */}
      <div className="profile-main-header">
        <div className="profile-avatar-section">
          <div className="profile-large-avatar">
            <img 
              src={user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.user_metadata?.full_name || user?.email || 'User')}&size=120&background=20c997&color=fff`} 
              alt="Profile" 
            />
            <div className="status-badge"></div>
          </div>
        </div>
        <div className="profile-info-section">
          <h1>{user?.user_metadata?.full_name || 'Deekshith Gowda H. S'}</h1>
          <p className="profile-email">{user?.email || 'deekshiharsha2185@gmail.com'}</p>
          <div className="profile-meta-info">
            <span>📅 Joined Sep 2025</span>
            <span>🛍️ Active Shopper</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="profile-navigation">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          🛍️ Orders
        </button>
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 Profile
        </button>
        <button 
          className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className="mobile-nav-dropdown">
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span>{tabLabels[activeTab]}</span>
          <span className={`dropdown-arrow ${mobileMenuOpen ? 'open' : ''}`}>▼</span>
        </button>
        {mobileMenuOpen && (
          <div className="mobile-nav-menu">
            {Object.entries(tabLabels).map(([key, label]) => (
              <button
                key={key}
                className={`mobile-nav-item ${activeTab === key ? 'active' : ''}`}
                onClick={() => handleTabChange(key)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="profile-content-area">
        {activeTab === 'overview' && (
          <div className="overview-section">
            {/* Stats Cards */}
            <div className="stats-cards-grid">
              <div className="stat-card">
                <div className="stat-icon">🛍️</div>
                <div className="stat-number">{userStats.orders}</div>
                <div className="stat-label">Orders</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">❤️</div>
                <div className="stat-number">{userStats.wishlist}</div>
                <div className="stat-label">Wishlist</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🛒</div>
                <div className="stat-number">{userStats.cart}</div>
                <div className="stat-label">Cart Items</div>
              </div>
              <div className="stat-card highlight-card">
                <div className="stat-icon">⭐</div>
                <div className="stat-number">{userStats.satisfaction}</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className="recent-activity-section">
              <div className="section-header">
                <h2>🕒 Recent Activity</h2>
              </div>
              <div className="activity-list">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon-wrapper">
                      {activity.status === 'delivered' ? '📦' : 
                       activity.status === 'shipped' ? '🚚' :
                       activity.status === 'processing' ? '⚙️' :
                       activity.status === 'updated' ? '❤️' : 
                       activity.status === 'pending' ? '🛒' : '📦'}
                    </div>
                    <div className="activity-details">
                      <h4>{activity.title}</h4>
                      <p>Updated {activity.date}</p>
                    </div>
                    <div className={`activity-status ${activity.status}`}>
                      {activity.status}
                    </div>
                    <div className="activity-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-section">
            <h2>Your Orders</h2>
            {loading ? (
              <p>Loading orders...</p>
            ) : orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-header">
                      <h4>Order {order.orderNumber}</h4>
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </div>
                    <div className="order-details">
                      <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                      <p><strong>Items:</strong> {order.items.length} item(s)</p>
                      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>You have not placed any orders yet.</p>
                <Link to="/shop" className="action-btn">Browse Products</Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
            <h2>Account Details</h2>
            <div className="profile-details-grid">
              <div className="detail-item">
                <strong>Name:</strong> {user?.user_metadata?.full_name || 'Deekshith Gowda H. S'}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {user?.email || 'deekshiharsha2185@gmail.com'}
              </div>
              <div className="detail-item">
                <strong>Member Since:</strong> September 2025
              </div>
              <div className="detail-item">
                <strong>Account Status:</strong> Active
              </div>
            </div>
            <Link to="/account/manage" className="action-btn">Manage Account</Link>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <div className="settings-grid">
              <Link to="/account/payment" className="setting-item">
                💳 Payment Methods
              </Link>
              <Link to="/account/addresses" className="setting-item">
                📍 Shipping Addresses
              </Link>
              <Link to="/wishlist" className="setting-item">
                ❤️ Wishlist
              </Link>
              <Link to="/account/security" className="setting-item">
                🔒 Security Settings
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;