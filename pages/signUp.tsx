import { Button, Snackbar } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { BgBox } from 'src/components';
import { SignUpForm } from 'src/container';

const SignUp: NextPage = () => {
  const router = useRouter();

  const [snackOpen, setSnackOpen] = useState({
    state: false,
    result: false,
    message: ''
  });

  const onGoLoginPage = () => {
    router.push('/');
  };

  const handleSnackClose = () => {
    setSnackOpen(() => ({ state: false, message: '', result: false }));
  };

  const successSnackAction = (
    <Button onClick={onGoLoginPage} color='secondary' size='small'>
      로그인 화면으로 이동
    </Button>
  );

  return (
    <BgBox>
      <SignUpForm setSnackOpen={setSnackOpen} />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackOpen.state}
        onClose={handleSnackClose}
        message={snackOpen.message}
        action={snackOpen.result && successSnackAction}
        key='bottomright'
      />
    </BgBox>
  );
};

export default SignUp;
