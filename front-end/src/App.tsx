import React, { useEffect, useState } from 'react';

// Define an interface for the user data
interface UserData {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

function App() {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    fetch("/user")
      .then(response => response.json())
      .then(data => {
        setUserData(data.users);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {userData.map((user, index) => (
          <li key={index}>
            <p>id: {user._id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Date: {user.createdAt} </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
