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
                const {_id,firstName, lastName, about, age, photourl, gender}=connection
                return(
                    <div key={_id} className="flex justify-center ">
                        <div className="flex gap-4 items-center w-130 p-4 my-3 rounded-2xl bg-base-200 shadow-md hover:shadow-xl transition-all">
                        <img className="w-22 h-22 rounded-full object-cover" src={photourl} alt="photo" />
                        <div className=" flex-1">
                        <h1 className="font-semibold">{firstName + " " + lastName}</h1>
                        {(age && gender) && <h2 className="text-sm text-gray-400">{age +" "+ gender }</h2>}
                        <p className="text-sm mt-1 text-gray-300 line-clamp-2">{about}</p>

                        

                        </div>
                        </div>

                    </div>
                    

                )
            })}
           
        </div>
    )
}

export default Connections;