import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Provider} from "react-redux"
import Navbar from "./Components/Navbar";
import Body from "./Components/Body";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed"
import Appstore from "./Utils/Appstore";
function App() {
  return (
        <div>
        <Provider store={Appstore}>
        <BrowserRouter basename="/">
        <Routes>
        <Route path="/" element={<Body/>}>

        <Route path="/" element={<Feed/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="profile" element={<Profile/>}/>
        
        </Route>

        </Routes>
        </BrowserRouter>
        </Provider>
        </div>
      

  );
}

export default App;
