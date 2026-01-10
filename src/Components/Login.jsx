import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser} from "../Utils/Userslice";
import { useNavigate } from "react-router-dom";
import Base_url from "../constants/Base_url";

const Login=()=>{
    const[emailId, setEmailId]=useState("");
    const[password, setPassword]=useState("");
    const[firstName, setFirstName]=useState("");
    const[lastName, setLastName]=useState("");
    const[age,setAge]=useState("");
    const[gender,setGender]=useState();
    const[isLoginForm,setIsLoginForm]=useState(false);
    const[open,setOpen]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [error, setError]= useState("");

    const setForm=()=>{
        if(isLoginForm){
            setIsLoginForm(false);
        } 
        else{
            setIsLoginForm(true);
        }
        
    }

    const handleLogin= async ()=>{
        try{
            const res=await axios.post(Base_url+"/login", {
                emailId,
                password
            }, { withCredentials: true });

            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
                console.log("Error: "+ err);
                const errmessage=err?.response?.data?.message || "something went wrong";
                alert(errmessage);
                setError(errmessage);
        }

    }

    const handleSignUp=async()=>{
        try{
            const res=await axios.post(Base_url+"/signup", {firstName,lastName,age,gender,emailId, password},{withCredentials:true});
            console.log(res);
            dispatch(addUser(res?.data?.data));
            navigate("/profile");

        }
        catch(err){
            setError("something went wrong "+err.message);

        }

    }

    return(

        <div className="flex justify-center my-20">

        <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
        <h2 className="card-title flex justify-center">{isLoginForm? "Login!": "Signup"}</h2>

        <label className="form-control w-full max-w-xs">

        {!isLoginForm &&
        <>
        {/* firstname input label */}
        <div className="form-control w-full max-w-xs my-4">
        <label className="label">
        <span className="label-text">First Name</span>
        </label>
        <input
        type="text"
        placeholder="Enter your First Name"
        value={firstName}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>{setFirstName(e.target.value)}}
        />
        </div>

        
        {/* last Name input label */}
        <div className="form-control w-full max-w-xs my-4">
        <label className="label">
        <span className="label-text">Last Name</span>
        </label>
        <input
        type="text"
        placeholder="Enter your Last Name"
        value={lastName}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>{setLastName(e.target.value)}}
        />
        </div>

        
        {/* age input label */}
        <div className="form-control w-full max-w-xs my-4">
        <label className="label">
        <span className="label-text">Age</span>
        </label>
        <input
        type="Number"
        placeholder="Enter Your Age"
        value={age}
        className="input input-bordered w-full max-w-xs"
        onChange={(e)=>{setAge(e.target.value)}}
        />
        </div>

        
            {/* gender dropdown */}
            <label htmlFor="">Select your gender:</label>
            <div className="form-control w-full max-w-xs my-4">


                <div className={`dropdown ${open ? "dropdown-open" : ""}`} value={gender}>
                <div
                    role="button"
                    className="btn w-full"
                    onClick={() => setOpen(true)}
                >
                    {gender}
                </div>

                <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-full p-2 shadow"
                >
                <li><button onClick={() => {
                    setGender("male");
                    setOpen(false)
                
                }}>Male</button></li>

                <li><button onClick={() => {
                    setGender("female");
                    setOpen(false)
                
                }}>Female</button></li>

                <li><button onClick={() => {
                    setGender("Others");
                    setOpen(false)
                
                }}>Others</button></li>
                </ul>
            </div>
            </div>
        </>
        }


        {/* email input label */}
        <div className="form-control w-full max-w-xs my-4">
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
        </div>

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
        <button className="btn btn-primary" onClick={()=>{
            if(isLoginForm) handleLogin();
            else handleSignUp(); 
        }}>{isLoginForm? "Login!": "Signup"}</button>
        </div>

        <button onClick={()=>setForm()} className="flex justify-center font-semibold">{isLoginForm? "New User? Sign up here": "Existing User? Login here"}</button>
        </div>
        </div>
        </div>
        
    )
}

export default Login;