
import React, { useRef , useEffect ,useState} from 'react';
import { message } from 'antd'
import '../../styles/partials/components/OTP.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerificationCodeInput = () => {
    let history = useNavigate()
    const inputRefs = useRef([]);

    const handleKeyUp = (event, index) => {
        const maxLength = event.target.maxLength;
        const currentLength = event.target.value.length;

        if (currentLength === maxLength && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        // if (currentLength === maxLength) {
        //     handleVerification();
        //   }
    };
    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData('text');
        const codeArray = pasteData.split('').slice(0, inputRefs.current.length);

        inputRefs.current.forEach((ref, index) => {
            ref.value = codeArray[index] || '';
        });
        // if (codeArray.length === inputRefs.current.length) {
        //     handleVerification();
        //   }
    }
    let code = '';
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [userData, setUserData] = useState();
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const handleVerification = () => {
        for (let i = 0; i < 6; i++) {
            code += inputRefs.current[i].value
        }
        axios.post('http://localhost:8000/api/verifyCode',{
            code:parseInt(code),
        }).then(response => {
            history('/')
            localStorage.setItem('verifier', true)

        }).catch((error) => {
            console.log(error)
            message.error(error.error)
        })
    }

    const isLoggedIn = !!token && !!user;
    useEffect(() => {
        if (isLoggedIn) {
            axios.get('http://localhost:8000/api/userProfile').then(response => {
                setUserData(response.data.email)
                console.log(userData)
                
            }
           
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   
      
 
   

  
      

   


    return (
        <main>
            <section className="section">
                <div className='container'>
                    <div className='wrapper '>
                        <div className='OTP'>
                            { userData !==undefined ? (
                                <>
                                <p>OTP sent on {userData.substring(0, 2) + '...' + userData.substring(userData.indexOf('@'))}</p>
                                 <h1>Enter OTP</h1> 
                                </>
                                 
                            ):(
                                <>
                                <p>OTP sent on </p>
                                 <h1>Enter OTP</h1> 
                                </>
                            )}
                           
                            <div className="otp-field">
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        ref={(ref) => (inputRefs.current[index] = ref)}
                                        onKeyUp={(event) => handleKeyUp(event, index)}
                                        onPaste={handlePaste}
                                    />
                                ))}

                            </div>
                            <button className='btn' onClick={handleVerification}>Verifier</button>
                        </div>

                    </div>

                </div>

            </section>

        </main>





    );
};

export default VerificationCodeInput;
