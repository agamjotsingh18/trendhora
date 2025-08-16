import React, { useEffect, useState } from 'react';
import Account from '../Account';
import './MyAccount.css';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase'; // make sure you have this configured

const MyAccount = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return (
    <Account>
      <div className="myaccount__container">

        {/* Order History */}
        <section className="account__section">
          <div className="section__header">Your Orders</div>
          <div className="section__body">
            <p>You have not placed any orders yet.</p>
            <Link to="/orders" className="primary__link">View Orders</Link>
          </div>
        </section>

        {/* Account Details */}
        <section className="account__section">
          <div className="section__header">
            <span>Account Details</span>
          </div>
          <div className="section__body">
            <div className="detail__item">
              <strong>Name:</strong> {user?.user_metadata?.full_name || 'N/A'}
            </div>
            <div className="detail__item">
              <strong>Email:</strong> {user?.email || 'N/A'}
            </div>
            <div className="manage__link">
              <Link to="/account/manage">Manage Account</Link>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="account__section">
          <div className="section__header">Payment Methods</div>
          <div className="section__body">
            <p>No saved payment methods.</p>
            <Link to="/account/payment" className="primary__link">Add Payment Method</Link>
          </div>
        </section>

        {/* Addresses */}
        <section className="account__section">
          <div className="section__header">Your Addresses</div>
          <div className="section__body">
            <p>No saved addresses.</p>
            <Link to="/account/addresses" className="primary__link">Manage Addresses</Link>
          </div>
        </section>

      </div>
    </Account>
  );
};

export default MyAccount;
