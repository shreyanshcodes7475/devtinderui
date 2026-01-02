import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Base_url from "../constants/Base_url";
import { removeUser } from "../Utils/Userslice";

const Navbar=()=>{
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  const Navigate=useNavigate();
  const handleLogout= async()=>{
      try{
        await axios.post(Base_url + "/logout", {},{
          withCredentials:true,
        })
        dispatch(removeUser());
        Navigate("/login")
      }
      catch(err){
        console.log(err);
        // or you can redirect to error page
      }
  }
    return(
            <div>
        <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            {user && <h5>Welcome! {user.firstName}</h5>}
          </div>
          

        { user &&
            <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex="0"
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User profile photo"
                  src={user.photourl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        }
        </div>
      </div>

    </div>
    )
}

export default Navbar;