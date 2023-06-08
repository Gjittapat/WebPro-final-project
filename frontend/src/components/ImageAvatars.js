import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function ImageAvatars({ size }) {
  let avatarSize = 40;

  if (size === 'small') {
    avatarSize = 40;
  } else if (size === 'large') {
    avatarSize = 220;
  }

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src="" sx={{ width: avatarSize, height: avatarSize }} />
    </Stack>
  );
}