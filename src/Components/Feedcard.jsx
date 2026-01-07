import axios from "axios";
import Base_url from "../constants/Base_url";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../Utils/Feedslice";
import { useState } from "react";

const Feedcard=({user})=>{
    const [loading, setLoading] = useState(false);

    const dispatch=useDispatch();
    if (!user) return null; 
    const {_id,firstName, lastName, age, about, photourl ,skills, gender}=user;

    const sendRequest=async (status,userId)=>{
             try{
                if(loading) return;
                setLoading(true);
                const res=await axios.post(Base_url + "/request/send/" + status+"/"+userId, {}, {withCredentials:true});
                dispatch(removeUserFromFeed(userId));
                setLoading(false);
            }
            catch(err){
                console.log(err);
            }
    }   

    return(
    <div className="flex justify-center h-120 py-10">
        <div className="card bg-base-300 w-90 shadow-sm">
            <figure>
            <img
            className="w-50"
            src={photourl}
            alt="profile-photo" />
            </figure>
            <div className="card-body">
            <p className="card-title name">{firstName} {lastName}</p>
            <p>{age} {gender}</p>
            <p>{about}</p>
            {skills && <p>skills: {skills.join(", ")}</p>}
            <div className="card-actions justify-between">
            <button className="btn w-20 bg-green-500" onClick={()=>sendRequest("Interested",_id)}>Interested</button>
            <button className="btn w-20 bg-red-500" onClick={()=>sendRequest("Ignored",_id)}>Ignore</button>

            </div>
            </div>
        </div>
    </div>
     
    )
}

export default Feedcard;