import React, { useState } from 'react';

import { Box, Button, TextField, Typography, InputAdornment, IconButton, Alert, Grid } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useLogin } from '../../api/queries/user/useLogin';
import { PATH } from '../../route/path';
import { CustomLink } from '../../components';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasFailed, setHasFailed] = useState(false); // alert 띄울지 여부
  const [isEmptyId, setIsEmptyId] = useState(false);
  const [isEmptyPw, setIsEmptyPw] = useState(false);

  const loginMutation = useLogin();

  const handleClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChangeId = (e) => {
    if (e.target.value) setIsEmptyId(false);
  };
  const handleChangePw = (e) => {
    if (e.target.value) setIsEmptyPw(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   user_id: data.get('userId'),
    //   password: data.get('password'),
    // });

    if (!data.get('userId') || !data.get('password')) {
      if (!data.get('userId')) setIsEmptyId(true);
      if (!data.get('password')) setIsEmptyPw(true);
    } else {
      loginMutation.mutate(
        {
          user_id: data.get('userId'),
          password: data.get('password'),
        },
        {
          onError: () => {
            setHasFailed(true);
          },
        }
      );
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" mb={5}>
        Academy Pro
      </Typography>
      <Typography variant="h5" align="center" mb={3}>
        로그인
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal" required fullWidth id="userId" label="아이디" name="userId" autoComplete="on" autoFocus error={hasFailed || isEmptyId} onChange={handleChangeId} />
        <TextField
          margin="normal"
          required
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="비밀번호"
          id="password"
          autoComplete="off"
          error={hasFailed || isEmptyPw}
          onChange={handleChangePw}
        />
        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
        {hasFailed ? <Alert severity="error">아이디 혹은 비밀번호를 확인하세요.</Alert> : null}
        {isEmptyId ? <Alert severity="error">아이디를 입력해주세요. </Alert> : null}
        {isEmptyPw ? <Alert severity="error">비밀번호를 입력해주세요. </Alert> : null}
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ my: 2 }}>
          로그인
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <CustomLink to={PATH.SIGNUP} text="회원가입" />
          <CustomLink to={PATH.LOGIN.FIND_ID} text="아이디 찾기" />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <CustomLink to={PATH.LOGIN.RESET_PW} text="비밀번호를 잊어버리셨나요?" />
        </Box>
      </Box>
    </>
  );
}

export default Login;
