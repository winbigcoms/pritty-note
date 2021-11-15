import { TextField } from '@mui/material';

export const CustomText = props => {
  const { label, type = 'text', variant = 'outlined' } = props;

  return <TextField label={label} variant={variant} type={type} />;
};
