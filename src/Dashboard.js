import React from "react";
import { useAuth } from "./Auth-context";

const Dashboard = ( ) =>{
    const {login , currentUser} = useAuth()
    console.log(currentUser,"user");

    return(<>Dashboard</>)
}

export default Dashboard;