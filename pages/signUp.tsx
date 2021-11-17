import { NextPage } from 'next';
import { BgBox } from 'src/components';
import { SignUpForm } from 'src/container';

const SignUp: NextPage = () => {
  return (
    <BgBox>
      <SignUpForm />
    </BgBox>
  );
};

export default SignUp;
