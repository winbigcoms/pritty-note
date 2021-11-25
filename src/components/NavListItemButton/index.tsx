import { ListItemButton, ListItemText } from '@mui/material';
import styled from '@emotion/styled-base';
import { useRouter } from 'next/dist/client/router';

const StyledListItemText = styled(ListItemText)`
  .css-10hburv-MuiTypography-root {
    font-family: 'Hi Melody', cursive !important;
    font-size: 18px;
  }
`;

export const NavListItemButton = ({ loop, selected, title, noteId, loginId, onSelect }) => {
  const router = useRouter();

  const onListClick = () => {
    onSelect(noteId);
    router.push(`/note/${loginId}/${noteId}`);
  };

  return (
    <ListItemButton
      sx={{ pl: loop * 2 }}
      style={{
        height: '60px'
      }}
      selected={selected}
      onClick={onListClick}
    >
      <StyledListItemText primary={title} />
    </ListItemButton>
  );
};
