import { useState } from 'react';
import { Link } from 'react-router-dom';
import './MyAccount.css';
import { Upload } from 'lucide-react';

const MyAccount = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = () => {
    alert('Profile image uploaded!');
  };

  return (
    <div className="account-container">
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-photo-section">
          <img
            src={preview || '/default-profile.png'}
            alt="Profile"
            className="profile-photo-preview"
          />

          <label htmlFor="profileUpload" className="custom-upload-button">
            <Upload size={18} style={{ marginRight: '6px' }} />
            Upload Photo
          </label>
          <input
            type="file"
            id="profileUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        </div>

        <div className="profile-right">
          <h2>Diksha Singh</h2>
          <p>diksha@example.com</p>
          <div className="profile-buttons">
            <Link to="/account/manage" className="btn edit-btn">Manage Account</Link>
            <Link to="/logout" className="btn logout-btn">Logout</Link>
          </div>
        </div>
      </div>

      <div className="orders-card">
        <h3>Order History</h3>
        <div className="no-orders">You have not placed any orders yet.</div>
      </div>
    </div>
  );
};

export default MyAccount;
