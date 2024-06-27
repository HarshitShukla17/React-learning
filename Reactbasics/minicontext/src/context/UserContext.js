import React from "react";
// part one..
const UserContext=React.createContext()
export default UserContext;


//here usercontext has become a provider
//now all the components inside it have access 
//to global UserContext..
{/* <UserContext>
    <Login />
    <Card>
        <Data />
    </Card>
</UserContext> */}



