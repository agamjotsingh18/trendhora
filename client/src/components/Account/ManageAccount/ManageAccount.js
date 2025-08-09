import { useState } from 'react';
import Account from '../Account';
import './ManageAccount.css';
import { Upload } from 'lucide-react';

const ManageAccount = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    
      <div className="manage-account-container">
        <h2 className="manage-account-header">Manage Your Account</h2>

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

        <form className="account-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input type="text" className="form-input" placeholder="Enter your phone" />
          </div>

          <div className="form-group">
            <label className="form-label">Address</label>
            <input type="text" className="form-input" placeholder="Enter your address" />
          </div>
        </form>

        <div className="actions">
          <button className="save-btn">Save Changes</button>
          <button className="delete-btn">Delete Account</button>
        </div>
      </div>
    
  );
};

export default ManageAccount;
