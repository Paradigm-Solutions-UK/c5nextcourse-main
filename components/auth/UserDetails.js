// UserDetails.js
import React from 'react';

const UserDetails = ({ authUser, userSignOut }) => {
  return (
    <div>
      {authUser ? (
        <>
          <p>{authUser.email}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default UserDetails;
