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
    <>
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* PAGE CONTENT (BODY SCROLLS) */}
      <main className="pt-16 pb-20 bg-base-200 min-h-screen">
        <Outlet />
      </main>

      {/* FIXED FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <Footer />
      </div>
    </>
  );
};

export default Body;