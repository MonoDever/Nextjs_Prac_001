import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import { Stack,Button,Alert } from "@mui/material";
import NestedModal from "../../components/utils/modal";

const login = () => {
    const [openModal, setOpenModal] = useState(false)
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState(""); 

    const showData = async () =>{
        // console.log(`username : ${username} password : ${password}`);
        // alert(`username : ${username} password : ${password}`)
        setTimeout(() => setOpenModal(true), 1000);
        console.log(openModal);
    }
    const handleClose = () =>{
        setOpenModal(false);
    }

    return (
        <div className="layout_main">
            <div className="box_login">
                
                <h1 className="user_header">Login</h1>
                <Stack spacing={2} className="stack_01">
                <TextField className={""}
                    id="outlined-basic"
                    label="username" variant="outlined"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                    InputLabelProps={{ style: { color: "black" } }}
                    InputProps={{ style: { color: "gray", border: '0px solid gray',width:'500px' } }}
                />
                 <TextField className={""}
                    id="outlined-required"
                    label="password" variant="outlined" type="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputLabelProps={{ style: { color: "black" } }}
                    InputProps={{ style: { color: "gray",width:'500px' } }}
                />
                <div>

                <Button variant="contained" size="large" 
                style={{color:'black'}} onClick={() => showData()}>
          Send
        </Button>
                </div>
                </Stack>
                
                <NestedModal openModal={openModal} 
                onCloseModal={handleClose}
                message={"Test"}/>
               
            </div>
        </div>
    )
}


export default login