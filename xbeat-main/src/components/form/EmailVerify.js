import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import ls from 'localstorage-slim';

const EmailVerify = () => {
    const history = useNavigate()
    const token = ls.get('token',{decrypt:true});
    const user = JSON.parse(ls.get('user',{decrypt:true}));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   useEffect(()=>{
axios.put(`http://localhost:8000/api/EmailVerify/${user.id}`).then(
            response => {
                history('/')
            }
        )
   })
return (
    <main>

    </main>
)
}
export default EmailVerify