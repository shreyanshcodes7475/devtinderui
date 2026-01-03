
const Feedcard=({user})=>{
    if (!user) return null; 
    const {firstName, lastName, age, about, photourl ,skills}=user;
    return(
    <div className="flex justify-center h-120 py-10">
        <div className="card bg-base-100 w-90 shadow-sm">
            <figure>
            <img
            className="w-50"
            src={photourl}
            alt="profile-photo" />
            </figure>
            <div className="card-body">
            <p className="card-title name">{firstName} {lastName}</p>
            <p>{age}</p>
            <p>{about}</p>
            {skills && <p>skills: {skills}</p>}
            <div className="card-actions justify-between">
            <button className="btn w-20 bg-green-500">Interested</button>
            <button className="btn w-20 bg-red-500">Ignore</button>

            </div>
            </div>
        </div>
    </div>
     
    )
}

export default Feedcard;