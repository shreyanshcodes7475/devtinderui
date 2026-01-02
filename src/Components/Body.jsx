import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import Base_url from "../constants/Base_url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/Userslice";
import { useEffect } from "react";

const Body = () => {
  const dispatch=useDispatch();
  const Navigate=useNavigate();
  const userdata=useSelector((store)=>store.user);

  const fetchUser= async()=>{
    if(userdata) return;
    try{
      const user=await axios.get(Base_url +"/profile/view", {
        withCredentials:true,
      })

      dispatch(addUser(user.data));
    }

    catch(err){
      if(err.status==401){
        dispatch(removeUser());
        Navigate("/login");
      }
      console.log(err.message);
    }
  }

  useEffect(()=>{
    fetchUser();
    },[]);

  return (
    <div className="layout">
      <Navbar/>
      <main className="content"><Outlet/> </main>
      <Footer />
    </div>
  );
};

export default Body;