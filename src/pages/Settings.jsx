import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Button } from '@mui/material';


export const Settings = () => {
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));

  useEffect(() => {
    localStorage.apiKey = apiKey;
  }, [apiKey]);

  console.log(apiKey)

  return (
    <Grid container direction='column' alignItems='flex-start' justifyContent='center'>
      <Typography gutterBottom variant='h5'>
        Settings
      </Typography>
      <TextField
        label="Web3.storage API Key"
        variant="outlined"
        type='password'
        fullWidth
        size='small'
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        sx={{ margin: '15px 0' }}
      />
      <Button variant='contained' color='primary' onClick={() => localStorage.apiKey = apiKey}>
        Save
      </Button>
    </Grid>
  );
};
