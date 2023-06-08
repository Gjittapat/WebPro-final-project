import { useAuthContext } from "../hooks/useAuthContext"
import React, { useRef } from 'react';
// components
import AddButton from '../components/MdOutlineAddBox';
import { Link } from 'react-router-dom'
import Feed from "../components/Feed";

const Home = () => {
  console.log("inside homee")

  const { user } = useAuthContext()
  return (
    <div className="home">
      <div className="home-top">
        <h2 className="email">{user.email}</h2>
        <div >
          <Link to="/additem">
            <AddButton />
          </Link>
        </div>
      </div>
      <div className="home-middle">
        <Feed />
      </div>
    </div>
  )
}

export default Home