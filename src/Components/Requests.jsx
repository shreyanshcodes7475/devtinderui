import axios from "axios";
import Base_url from "../constants/Base_url";
import { useEffect } from "react";
import { addRequest } from "../Utils/Requestsslice";
import { useDispatch, useSelector } from "react-redux";
const Requests=()=>{
    const requests=useSelector((store)=>store.request);
    console.log(requests);
    const dispatch=useDispatch();


    const fetchRequest=async()=>{
        try{
            const res=await axios.get(Base_url + "/user/request/received",{withCredentials:true});
            dispatch(addRequest(res?.data?.ConnectionRequests || []));
        }
        catch(err){
            console.log(err);    
        }
    }

    const reviewRequest=async (status,req_id)=>{
        try{
            const res= await axios.post(Base_url + "/request/review/" + status +"/"+req_id, {},{withCredentials:true});
            
        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        fetchRequest();
    },[])

    if(!requests) return <h1 className=" flex justify-center text-3xl bold my-5">Loading...</h1>;
    if(requests.length==0) return <h1 className=" flex justify-center text-3xl bold my-5">No Request Found</h1>

    return(
        <div>
            <h1 className=" flex justify-center text-3xl bold">Requests</h1>

            {requests.map((req)=>{
                const {_id,firstName, lastName, about, age, photourl, gender}=req.fromUserId
                return(
                    <div key={_id} className="flex justify-center">
                        <div className="flex justify-evenly min-w-150 max-w-200 py-5 my-5 items-center  rounded-2xl bg-base-300">
                        <img className="w-22 h-22 rounded-full mx-2" src={photourl} alt="photo" />
                        <div className="pl-5">
                        <h1>{firstName + " " + lastName}</h1>
                        {(age && gender) && <h2>{age + gender }</h2>}
                        <p>{about}</p>
                        </div>

                        <div>
                            <button className="btn btn-primary mx-2" onClick={()=>{
                                reviewRequest("Accepted", req._id);
                            }}>Aceept</button>
                            <button className="btn btn-secondary mx-2" onClick={()=>{
                                reviewRequest("Rejected", req._id);
                            }}>Reject</button>
                        </div>


                    </div>

        </div>
                )
            })}
           
        </div>
    )
}

export default Requests;