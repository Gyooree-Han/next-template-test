'use client';

import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';
// import Router from 'next/router';
import { usePathname,useRouter } from 'next/navigation';

type Props = {}

const Login = ({}: Props) => {

    // state
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    //router
    const router = useRouter();
    const pathname = usePathname();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async() => {
        // 여기에서 email과 password 상태를 사용하여 필요한 작업을 수행
        console.log('Email:', email);
        console.log('Password:', password);
        const json = {
            userEmail : email,
            password: password,
        };

        try
        {
            const res =  await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/user/login',json)
            console.log(res.status,'res.status')
            if(res.status === 200 || res.status === 201)
            {
                const accessToken = res.data.data.accessToken;
                const refreshToken = res.data.data.refreshToken;

                // 쿠키에 저장하기
                const cookies = new Cookies();
                cookies.set('EWSoft_AccessToken', accessToken);
                cookies.set('EWSoft_RefreshToken', refreshToken);
                router.push('/')
            }
            else
            {
                alert("아이디 혹은 비밀번호를 확인해주세요.")
            }
        }
        catch(error)
        {
            console.error(error)
            throw 'server에러'
        }

    };


    
    
    return <>
        <div className = "h-screen flex items-center justify-center bg-gray-800">
            <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center text-center">
                <h3 className="text-3xl text-gray-800">Log In</h3>
                <form className="flex flex-col mt-5 px-5">
                    <input 
                        placeholder ="Email" 
                        className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 mb-3 py-3 px-5 rounded-lg" 
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input 
                        placeholder ="password " 
                        className="bg-gray-100 shadow-inner focus:outline-none border-2 focus:border-opacity-50 focus:border-green-600 py-3 px-5 rounded-lg" 
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button
                        type='button'
                        className="py-3 px-5 bg-gray-800 text-white mt-3 text-lg rounded-lg focus:outline-none hover:opacity-90"
                        onClick={handleSubmit}
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>;
    </>
}

export default Login;