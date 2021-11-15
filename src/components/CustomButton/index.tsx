import { Button } from '@mui/material';

export const CustomButton = props => {
  const { text, ...rest } = props;

  return <Button {...rest}>{text}</Button>;
};
