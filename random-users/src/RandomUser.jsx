import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RandomUser.css";

function RandomUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "https://api.freeapi.app/api/v1/public/randomusers",
        );
        setUsers(res.data.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="page-wrapper">
      <h1 className="main-title">Community Directory</h1>
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.login.uuid} className="user-card">
            <div className="head">
              <div className="avatar-wrapper">
                <img
                  src={user.picture.large}
                  alt={user.name.first}
                  className="user-img"
                />
                <span className={`status-dot ${user.gender}`}></span>
              </div>

              <div className="user-info">
                <h2 className="name">
                  {user.name.first} {user.name.last}
                </h2>
                <p className="username">@{user.login.username}</p>
              </div>
            </div>

            <div className="middle">
              <div className="detail-row">
                <span className="icon">📧</span>
                <span className="text">{user.email}</span>
              </div>
              <div className="detail-row">
                <span className="icon">📍</span>
                <span className="text">
                  {user.location.city}, {user.location.country}
                </span>
              </div>
              <div className="detail-row">
                <span className="icon">📞</span>
                <span className="text">{user.phone}</span>
              </div>
            </div>

            <div className="footer">Member for {user.registered.age} years</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RandomUser;
