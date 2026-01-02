import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser} from "../Utils/Userslice";
import { useNavigate } from "react-router-dom";
import Base_url from "../constants/Base_url";

const Login=()=>{
    const[emailId, setEmailId]=useState("Shreyansh.guptarewa@gmail.com");
    const[password, setPassword]=useState("Ansh@123$");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [error, setError]= useState("");

    const handleLogin= async ()=>{
        try{
            const res=await axios.post(Base_url+"/login", {
                emailId,
                password
            }, { withCredentials: true });

            dispatch(addUser(res.data));


            // through fetch---------------------------------
            // fetch("http://localhost:3000/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({ emailId, password }),
            //     credentials: "include"  // ✅ cookie allow karne ke liye
            // });
            return navigate("/");


        }
        catch(err){
                console.log("Error: "+ err);
                const errmessage=err?.response?.data?.message || "something went wrong";
                alert(errmessage);
                setError(errmessage);
        }

    }

    return(

        <div className="flex justify-center my-20">

        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
        <h2 className="card-title flex justify-center">Login!</h2>

        <label className="form-control w-full max-w-xs">

        {/* email input label */}
        <label className="label">
        <span className="label-text">Email ID</span>
        </label>
        <input
        type="text"
        placeholder="Enter email"
        value={emailId}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>{setEmailId(e.target.value)}}
        />

        {/* password input label */}
        <div className="form-control w-full max-w-xs my-4">
        <label className="label">
        <span className="label-text">Password</span>
        </label>
        <input
        type="password"
        placeholder="Enter password"
        value={password}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>{setPassword(e.target.value)}}
        />
        </div>

        <p className="text-red-500">{error}</p>


        </label>
        <div className="card-actions justify-center my-2">
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>
        </div>
        
    )
}

export default Login;