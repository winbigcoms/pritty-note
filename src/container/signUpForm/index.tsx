import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { CustomButton } from "src/components";
import { useRouter } from "next/dist/client/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

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
    margin-bottom: 50px;
  }

  & > div{
    width: 80%;
    margin: auto;
    display: flex;
    margin-top:44px;
  }
`;

const FlexBox = styled.div`
  display: flex;
`;

const SignUpFormContent = () => {
  const [isShowPW, setShowPW] = useState(false);
  const router = useRouter();

  const onSignUp = () => {
    router.push("/");
  };

  const onGoLoginPage = () => {
    router.push("/");
  };

  const changeShow = () => {
    setShowPW((state) => !state);
  };

  return (
    <SignUpFormBox>
      <h2>Pritty Note SignUp</h2>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%", mb: "25px" },
          "&": { padding: "0px 70px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="loginID" label="로그인 아이디" variant="standard" />
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            id="loginPW"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={changeShow}
                >
                  {isShowPW ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            type={isShowPW ? "text" : "password"}
          />
        </FormControl>
        <TextField id="loginName" label="사용자 이름" variant="standard" />
        <FlexBox>
          <SubmitButton onClick={onSignUp} variant="outlined" text="signUp" />
          <SubmitButton
            onClick={onGoLoginPage}
            variant="outlined"
            text="뒤로가기"
          />
        </FlexBox>
      </Box>
    </SignUpFormBox>
  );
};

export const SignUpForm = React.memo(SignUpFormContent);