import React, { useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useAuth } from './Auth-context';
import {useNavigate } from 'react-router-dom'

const EmailSignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    width: 360px;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
  }
`;

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const EmailAuth = () => {
    const {login , currentUser} = useAuth()
    console.log(currentUser,"user");
    const [error , setError] = useState("")
    const [loading,setLoading ] = useState(false)
    const navigate = useNavigate()
  const onFinish = async(values) => {
    console.log(values.user);
    try{
        setError("")
        setLoading(true);
        await login(values.user.email,values.user.password)
    }catch{
        setError("Faild to signin")
    }
    // navigate('/dashboard')
  };

  return (
    <EmailSignInWrapper style={{background:"#F2F2F2"}}>

    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
      
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
            {
                type: 'email',
            },
        ]}
        >
        <Input/>
      </Form.Item>
      <Form.Item
        name={['user', 'password']}
        label="Password"
        rules={[
            {
                required: true,
            },
        ]}
        >
        <Input.Password/>
      </Form.Item>
     
      <Form.Item style={{textAlign:"center"}}>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
          </EmailSignInWrapper>
  );
};

export default EmailAuth;