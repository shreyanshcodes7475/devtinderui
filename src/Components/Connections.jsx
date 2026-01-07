import { useEffect } from "react";
import Base_url from "../constants/Base_url";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../Utils/Connectionsslice";

const Connections=()=>{
    const connections=useSelector((store)=>store.connection);
    console.log(connections);
    const dispatch=useDispatch();
    const fetchConnections=async ()=>{
        try{
            const res=await axios.get(Base_url+ "/user/connections", {withCredentials:true})
            dispatch(addConnections(res?.data?.data));
        }
        catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{
        fetchConnections();
    },[])

    if(!connections) return <h1 className=" flex justify-center text-3xl bold my-5">Loading...</h1>;
    if(connections.length==0) return <h1 className=" flex justify-center text-3xl bold my-5">No Connections Found</h1>

    return(
        <div>
            <h1 className=" flex justify-center text-3xl bold">Connections</h1>

            {connections.map((connection)=>{
                const {firstName, lastName, about, age, photourl, gender}=connection
                return(
                        <div className="flex justify-center">
                        <div className="flex w-150 py-5 my-5 items-center  rounded-2xl bg-base-300">
                        <img className="w-22 h-22 rounded-full" src={photourl} alt="photo" />
                        <div className="pl-5">
                        <h1>{firstName + " " + lastName}</h1>
                        {(age && gender) && <h2>{age + gender }</h2>}
                        <p>{about}</p>

                        </div>
                        </div>

                    </div>
                    

                )
            })}
           
        </div>
    )
}

export default Connections;