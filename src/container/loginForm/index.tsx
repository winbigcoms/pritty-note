import React, { ChangeEvent, useEffect, useState } from 'react';

import styled from 'styled-components';

import { CustomButton, CustomText } from 'src/components';
import { useRouter } from 'next/dist/client/router';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from 'src/store/modules/user/slice';
import { RootState } from 'src/store/modules';

const LoginFormBox = styled.div`
  width:60%
  height:50%;
  min-width:683px;
  min-height:526px;
  background: rgba(255,255,255,0.5);
  backdrop-filter: blur(2px);
  border-radius:45px;
  padding: 96px 0 42px;

  & > h2 {
    font-family: 'Laila', sans-serif;
    font-weight:500;
    text-align:center;
    font-size:36px;
    margin-bottom: 91px;
  }

  & > div{
    width: 80%;
    margin: auto;
    display: flex;
    margin-top:44px;
  }

  & div > button{
    margin:46px auto 0px;
    display:block;
    font-size:30px;
    width: 170px;
    height: 60px;
    border: 1px solid #000;
    color: #000;

    &:hover{
      border: 1px solid #000;
    }
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

type inputIdType = 'id' | 'pw';

const LoginFormContents = () => {
  const [loginData, setLoginData] = useState({
    id: '',
    pw: ''
  });

  const router = useRouter();
  const loginId = useSelector((state: RootState) => state.user).id;
  const dispatch = useDispatch();

  const onLogin = () => {
    for (let inputData in loginData) {
      if (!loginData[inputData as inputIdType]) return;
    }
    dispatch(loginRequest(loginData));
  };

  const onSignUp = () => {
    router.push('/signUp', undefined, { shallow: true });
  };

  const onChangeLoginData = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginData(state => ({ ...state, [id]: value }));
  };

  useEffect(() => {
    if (loginId !== '') {
      router.push(`/note/${loginId}/0`);
    }
  }, [loginId, router]);

  return (
    <LoginFormBox>
      <h2>Pritty Note</h2>
      <CustomText label='id' id='id' value={loginData.id} onChange={onChangeLoginData} />
      <CustomText
        label='pw'
        id='pw'
        type='password'
        value={loginData.pw}
        onChange={onChangeLoginData}
      />
      <FlexBox>
        <CustomButton onClick={onLogin} variant='outlined' text='Login' />
        <CustomButton onClick={onSignUp} variant='outlined' text='SignUp' />
      </FlexBox>
    </LoginFormBox>
  );
};

export const LoginForm = React.memo(LoginFormContents);
