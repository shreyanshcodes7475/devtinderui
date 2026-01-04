import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser} from "../Utils/Userslice";
import { useNavigate } from "react-router-dom";
import Base_url from "../constants/Base_url";
import Feedcard from "./Feedcard";


const Editprofile=()=>{
    const user=useSelector((store)=>store.user);
    const [open, setOpen] = useState(false);
    const[firstName, setFirstName]=useState(user.firstName || "");
    const[lastName, setLastName]=useState(user.lastName || "");
    const[about, setAbout]=useState(user.about || "");
    const[age, setAge]=useState(user.age || "");
    const[photoUrl, setPhotoUrl]=useState(user.photourl || "");
    const[skills, setSkills]=useState(user.skills || []);
    const[gender, setGender]=useState(user.gender || "");

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [error, setError]= useState("");
    const [toast, setToast]=useState(false);


    const saveProfile= async()=>{
        setError("");
        try{
            const res=await axios.patch(Base_url+ "/profile/edit",             
                {
                firstName,
                lastName,
                about,
                photourl: photoUrl,
                age,
                skills,
                gender,
                }, {withCredentials:true})
                console.log(res);
                dispatch(addUser(res?.data?.data));
                setToast(true);
                setTimeout(()=>{
                    setToast(false);
                },2000);
                
        }
        catch(err){
            console.log(err);
            setError(err?.response?.data);
        }
    }
    return(
    <div className="flex justify-center ">
    
            <div className="flex justify-center my-20 px-20 top-0">

            <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
            <h2 className="card-title flex justify-center">Edit Profile!</h2>

            <label className="form-control w-full max-w-xs">

            {/* first name input label */}
            <label className="label">
            <span className="label-text">First Name</span>
            </label>
            <input
            type="text"
            placeholder="Enter Your FirstName"
            value={firstName}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>{setFirstName(e.target.value)}}
            />

            {/* last name input label */}
            <div className="form-control w-full max-w-xs my-4">
            <label className="label">
            <span className="label-text">Last Name</span>
            </label>
            <input
            type="text"
            placeholder="Enter Your Last Name"
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
            type="text"
            placeholder="Enter Your age"
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

            {/* age input label */}
            <div className="form-control w-full max-w-xs my-4">
            <label className="label">
            <span className="label-text">Photourl</span>
            </label>
            <input
            type="text"
            placeholder="Enter Your photourl"
            value={photoUrl}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>{setPhotoUrl(e.target.value)}}
            />
            </div>

            {/* about input label */}
            <div className="form-control w-full max-w-xs my-4">
            <label className="label">
            <span className="label-text">About</span>
            </label>
            <input
            type="text"
            placeholder="Add something about you"
            value={about}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>{setAbout(e.target.value)}}
            />
            </div>

            {/* skills input label */}
            <div className="form-control w-full max-w-xs my-4">
            <label className="label">
            <span className="label-text">Skills</span>
            </label>
            <input
            type="text"
            placeholder="Add your skill set"
            value={skills}
            className="input input-bordered w-full max-w-xs"
            onChange={(e)=>{setSkills(e.target.value.split(", "))}}
            />
            </div>
            


            <p className="text-red-500">{error}</p>


            </label>
            <div className="card-actions justify-center my-2">
            <button onClick={saveProfile} className="btn btn-primary">Save Profile</button>
            </div>
            </div>
            </div>
            </div>
            <div className="my-10 px-20">
            {user && (
            <Feedcard
                user={{
                firstName,
                lastName,
                about,
                photourl: photoUrl,
                age,
                skills,
                gender,
                }}
            />
            )}
            </div>
            
            {toast &&
            
            <div class="toast toast-top toast-center">
            <div class="alert alert-info">
                <span>New mail arrived.</span>
            </div>
            <div class="alert alert-success">
                <span className="font-bold">Profile saved Succesfully</span>
            </div>
            </div>
            }



    </div>

    )
}


export default Editprofile;