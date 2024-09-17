import {useContext, useState} from "react";
import { UserContext } from "../UserContext.js"; 
import {Navigate, useParams} from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav.js";
import Hotels from "./Hotels.js";

const Account = () => {
  const {ready,user,setUser} = useContext(UserContext);
  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function logout() {
    await axios.post('/logout');
    <Navigate to="/" />
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <Hotels/>
      )}
    </div>
  );
}

export default Account