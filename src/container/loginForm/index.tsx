import { CustomButton, CustomText } from 'src/components';
import styled from 'styled-components';

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

  &>button{
    margin:46px auto 0px;
    display:block;
    font-size:30px;
    width: 170px;
    height: 60px;
    color: #aaa;
    border: 1px solid #aaa;

    &:hover{
      border: 1px solid #000;
      color: #000;
    }
  }
`;

export const LoginForm = () => {
  return (
    <LoginFormBox>
      <h2>Pritty Note</h2>
      <CustomText label='ID' />
      <CustomText label='PW' type='password' />
      <CustomButton variant='outlined' text='Login' />
    </LoginFormBox>
  );
};
