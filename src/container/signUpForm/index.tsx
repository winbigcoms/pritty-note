import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar
} from '@mui/material';
import styled from 'styled-components';
import { CustomButton } from 'src/components';
import { useRouter } from 'next/dist/client/router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import { SignUpService } from 'src/service/signUp';

const SubmitButton = styled(CustomButton)`
  margin: 46px auto 0px;
  display: block;
  font-size: 30px;
  width: 170px;
  height: 60px;
  border: 1px solid #000;
  color: #000;

  &:hover {
    border: 1px solid #000;
  }
`;

const SignUpFormBox = styled.div`
  min-width: 683px;
  min-height: 526px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(2px);
  border-radius: 45px;
  padding: 96px 0 42px;

  & > h2 {
    font-family: 'Laila', sans-serif;
    font-weight: 500;
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
  }

  & > div {
    width: 80%;
    margin: auto;
    display: flex;
    margin-top: 44px;
  }

  label {
    left: -13px;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

type snackState = {
  state: boolean;
  result: boolean;
  message: string;
};

type inputIdType = 'loginID' | 'loginPW' | 'loginName';

const SignUpFormContent = (props: { setSnackOpen: Dispatch<SetStateAction<snackState>> }) => {
  const { setSnackOpen } = props;
  const [isShowPW, setShowPW] = useState(false);
  const [signUpData, setSignUpData] = useState({
    loginID: '',
    loginPW: '',
    loginName: ''
  });

  const router = useRouter();

  const onGoLoginPage = () => {
    router.push('/');
  };

  const changeShow = () => {
    setShowPW(state => !state);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setSignUpData(datas => ({ ...datas, [id]: value }));
  };

  const onSubmitSignUp = async () => {
    for (let inputData in signUpData) {
      if (!signUpData[inputData as inputIdType]) return;
    }
    const request = await SignUpService.signUpRequest(signUpData);

    setSnackOpen(() => ({
      state: true,
      result: request.result,
      message: request.message
    }));
  };

  return (
    <SignUpFormBox>
      <h2>Pritty Note SignUp</h2>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { width: '100%', mb: '25px' },
          '&': { padding: '0px 70px' }
        }}
        noValidate
        autoComplete='off'
      >
        <FormControl>
          <InputLabel>로그인 아이디</InputLabel>
          <Input id='loginID' type='text' value={signUpData.loginID} onChange={onChangeInput} />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            id='loginPW'
            value={signUpData.loginPW}
            onChange={onChangeInput}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  sx={{ padding: 0 }}
                  onClick={changeShow}
                >
                  {isShowPW ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            type={isShowPW ? 'text' : 'password'}
          />
        </FormControl>
        <FormControl>
          <InputLabel>사용자 이름</InputLabel>
          <Input id='loginName' type='text' value={signUpData.loginName} onChange={onChangeInput} />
        </FormControl>
        <FlexBox>
          <SubmitButton onClick={onSubmitSignUp} variant='outlined' text='signUp' />
          <SubmitButton onClick={onGoLoginPage} variant='outlined' text='뒤로가기' />
        </FlexBox>
      </Box>
    </SignUpFormBox>
  );
};

export const SignUpForm = React.memo(SignUpFormContent);
