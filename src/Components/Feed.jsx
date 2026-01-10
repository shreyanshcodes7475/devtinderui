import axios from "axios";
import Base_url from "../constants/Base_url";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/Feedslice";
import Feedcard from "./Feedcard";
import { useEffect } from "react";

const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed);
    const getFeed=async ()=>{
        if(feed && feed.length> 0) return;
        try{
            const res=await axios.get(Base_url + "/user/feed", {withCredentials:true});
            dispatch(addFeed(res?.data?.users));
        }
        catch(err){
            console.log(err);
        }  
    }

    useEffect(()=>{
        if( !feed || feed.length==0){
            getFeed();
        }
    },[feed])


    if(!feed) return <h1 className="text-2xl flex justify-center ">Loading...</h1>
    if(feed.length==0) return <h1 className="text-2xl flex justify-center">No users on the feed</h1>
    return  (
            <div className="transition-all duration-300 ease-in-out">
                {(feed && feed.length>0) && <Feedcard user={feed[0]}/>}
            </div>
    )
}

export default Feed;