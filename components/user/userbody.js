import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from 'react';
import { Stack } from "@mui/material";
import { UserContext } from '../../pages/user/member';
export default function userbody(props) {
    const { userLogin, setUserLogin } = useContext(UserContext);

    useEffect(() => {
        console.log(userLogin)
    }, [])


    return (
        <>
            <Stack spacing={2} className="stack_01">
                {/* <TextField className={""}
                    id="outlined-basic"
                    label="username" variant="outlined"
                    defaultValue={userLogin.username}
                    onChange={(e) => setUserLogin({...userLogin,username: e.target.value})}
                    InputLabelProps={{ style: { color: "black" } }}
                    InputProps={{ style: { color: "gray", border: '0px solid gray',width:'500px' } }}
                />
                <TextField className={""}
                    id="outlined-basic"
                    label="password" variant="outlined"
                    defaultValue={userLogin.password}
                    onChange={(e) => setUserLogin({...userLogin,password:e.target.value})}
                    InputLabelProps={{ style: { color: "black" } }}
                    InputProps={{ style: { color: "gray", border: '0px solid gray',width:'500px' } }}
                /> */}
                <div className='container'>
                    <div className='row'>
                        
                        <div style={{ textAlign: 'left', display: 'inline' }}>
                            <label for="email" ><b>Email</b></label>
                            <input className='inputlogin' type="text" placeholder="Enter Email" name="email" id="email" required></input>
                        </div>

                        <div style={{ textAlign: 'left', display: 'inline' }}>
                            <label for="Password" ><b>Password</b></label>
                            <input className='inputlogin' type="password" placeholder="Enter Password" name="password" id="password" required></input>
                        </div>

                        <div style={{ textAlign: 'left', display: 'inline' }}>
                            <label for="psw-repeat" ><b>Repeat Password</b></label>
                            <input className='inputlogin' type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required></input>
                        </div>

                    </div>
                </div>
            </Stack>
        </>
    )
}