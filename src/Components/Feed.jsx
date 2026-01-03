import axios from "axios";
import Base_url from "../constants/Base_url";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../Utils/Feedslice";
import Feedcard from "./Feedcard";
import { useEffect } from "react";

const Feed=()=>{

    const dispatch=useDispatch();
    const feed=useSelector((store)=>store.feed);
    console.log(feed);
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
        getFeed();
    },[])



    return  (
            <div>
                {(feed && feed.length>0) && <Feedcard user={feed[0]}/>}
            </div>
    )
}

export default Feed;