import { useState } from "preact/hooks";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import './account.css'; 

//Jotai import 
import { useAtom } from "jotai";
import { logIn } from "../../../components/app";

//icons import 
import { BiUser } from 'react-icons/bi';
import { SiMinutemailer } from 'react-icons/si';
import { RiLockPasswordLine, RiLockPasswordFill } from 'react-icons/ri';

//Firebase initialized app import
import { app } from "../../../components/app";

const Account = () => {
    const [,setLoggedIn] = useAtom(logIn);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ isRegister, setIsRegister ] = useState('Register');
  
    const onSubmit = async e => {
        e.preventDefault();
        var user = {};
        if(isRegister === 'Register') {
            if(email !== '' && username !== '' & password !== 0) {
                if(password.length < 7 || password !== confirmPassword) {
                    if(password.length < 7) alert('Please make sure password characters is greater than 6')
                    else if(password !== confirmPassword) alert('Password does not match')
                    else {
                        user = {
                            email,
                            password,
                            confirmPassword
                        }
                    }
                }
            } else alert('Please enter details and make sure password match');
        } else {
            if(email !== '' && password !== '') {
                user = {
                    email,
                    password
                }
            } else alert('Please enter details');
        }

        console.log(user)
      
        if(user.length !== 0 ) {
            const auth = getAuth(app);
            if(isRegister === 'Register') {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        // ...
                        localStorage.setItem('user', JSON.stringify(username));
                        setLoggedIn(true);
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                        console.log(`%c ${errorCode} %c ${errorMessage}`, `color: red`, `color:green`);
                    })
            } else {
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        const user = userCredential.user;
                        // ...
                        localStorage.setItem('user', 'true');
                        setLoggedIn(true);
                        console.log(user);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(`%c ${errorCode} %c ${errorMessage}`, `color: red`, `color:green`);
                    });
            }
        }
    }

    const changeToOther = () => {
        isRegister === 'Register' ? setIsRegister('Login') : setIsRegister('Register');
    }
  
    return (
        <div className='account_main'>
            <h3>{isRegister}</h3>
            {isRegister === 'Login' && <small className='small'>You can enter either <strong>email</strong> and <strong>password</strong> to login</small>}
            <form onSubmit={onSubmit} className='form'>
                { isRegister ==='Register' && <span className='input_contain'>
                    <BiUser />
                    <input className='input' type="text" name="username" value={username} placeholder="enter username" onChange={e => setUsername(e.target.value)} />
                </span>}
                <br />
                <span className='input_contain'>
                    <SiMinutemailer />
                    <input className='input' type="email" name="email" value={email} placeholder="enter email" onChange={e => setEmail(e.target.value)} />
                </span>
                <br />
                <span className='input_contain'>
                    <RiLockPasswordLine />
                    <input className='input' type="password" name="password" value={password} placeholder="enter password" onChange={e => setPassword(e.target.value)} />
                </span>
                <br />
                
                {isRegister === 'Register' && <span className='input_contain'><RiLockPasswordFill/><input className='input' type="password" name="confirm_password" value={confirmPassword} placeholder="confirm password" onChange={e => setConfirmPassword(e.target.value)} /></span>}
                <br />
                <button className='input_btn' type="submit">Submit</button>
            </form>
            <p>
            {
                isRegister === 'Register' ? 
                <p><small>Already have an account <strong className='c_strng' onClick={changeToOther}>Login</strong></small></p> :
                <p><small>New, create an account <strong className='c_strng' onClick={changeToOther}>Register</strong></small></p>  
            }
            </p>
        </div>
    );
  }

  export default Account;