import { useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";


const EmailVerify = () => {
    const history = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   useEffect(()=>{
axios.put(`http://localhost:8000/api/EmailVerify/${user}`).then(
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