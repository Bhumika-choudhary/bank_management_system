import React from "react";

const Profile = () => {
  return (
    <div className="profile-card">
      <img
        src="https://via.placeholder.com/120"
        alt="Profile"
        className="profile-image"
      />
      <h2>Rahul Sharma</h2>
      <p>Email: rahul.sharma@example.com</p>
      <p>Role: Bank Manager</p>
      <button className="danger">Logout</button>
    </div>
  );
};

export default Profile;

