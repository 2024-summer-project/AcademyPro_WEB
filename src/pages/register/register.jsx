import React, { useState } from 'react';

import { Box, Container, Typography, Button, TextField, Grid, Alert } from '@mui/material';
import useLogout from '../../api/queries/user/useLogout';
import { useUserAuthStore } from '../../store';
import { useRegisterAcademy, useRegisterTeacher } from '../../api/queries/register/useRegister';

export default function Register({ name, position }) {
  // 0: 요청 버튼, 1: 학원 등록, 2: 강사 등록, 3: 등록요청 완료
  const [status, setStatus] = useState(0);

  const logoutMutation = useLogout();

  const handleClick = () => {
    if (position === 'director') setStatus(1);
    else if (position === 'teacher') setStatus(2);
  };

  const handleSignOut = () => {
    logoutMutation.mutate();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" align="center">
          Academy Pro
        </Typography>
        {status === 0 && <BeforeRegister name={name} position={position} handleClick={handleClick} handleSignOut={handleSignOut} />}
        {status === 1 && <RegisterAcademy setStatus={setStatus} handleSignOut={handleSignOut} />}
        {status === 2 && <RegisterTeacher setStatus={setStatus} handleSignOut={handleSignOut} />}
        {status === 3 && <AfterRegister handleSignOut={handleSignOut} />}
      </Box>
    </Container>
  );
}

function BeforeRegister({ name, position, handleClick, handleSignOut }) {
  return (
    <Box mt={10} sx={{ width: '100%' }}>
      {position === 'director' && (
        <Typography variant="h5" align="center" mb={20}>
          {name}(원장)님,
          <br />
          학원을 등록해주세요.
        </Typography>
      )}
      {position === 'teacher' && (
        <Typography variant="h5" align="center" mb={20}>
          {name}(강사)님,
          <br />
          근무하고 계신 학원에 강사 등록을 요청하세요.
        </Typography>
      )}
      <Button variant="contained" size="large" fullWidth onClick={handleClick}>
        {position === 'director' ? '우리 학원 등록하기' : '학원에 등록 요청하기'}
      </Button>
      <Button size="large" fullWidth onClick={handleSignOut}>
        로그아웃
      </Button>
    </Box>
  );
}

function RegisterAcademy({ setStatus, handleSignOut }) {
  const registerAcademyMutation = useRegisterAcademy();

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submitData = {
      academy_name: data.get('academyname'),
      academy_email: data.get('academyemail'),
      phone_number: data.get('academyphone'),
      address: data.get('academyaddress'),
    };

    // console.log(submitData);
    registerAcademyMutation.mutate(submitData, {
      onSuccess: () => {
        setStatus(3);
      },
      onError: (error) => {
        setIsError(true);
        if (error.errorCode === 409) {
          setErrorMsg('이미 등록 요청된 상태입니다.');
        } else if (error.errorCode === 500) {
          setErrorMsg('등록 요청 중 오류가 발생했습니다.');
        }
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={5}>
      <Typography variant="h5" align="center" mb={10}>
        학원 등록
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12}>
          <TextField name="academyname" id="academyname" label="학원 이름" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyemail" id="academyemail" label="학원 이메일" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyphone" id="academyphone" label="학원 전화번호" required fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField name="academyaddress" id="academyaddress" label="학원 주소" required fullWidth />
        </Grid>
      </Grid>
      {isError && <Alert severity="error">{errorMsg}</Alert>}
      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
        등록 요청하기
      </Button>
      <Button size="large" fullWidth onClick={handleSignOut}>
        로그아웃
      </Button>
    </Box>
  );
}

function RegisterTeacher({ setStatus, handleSignOut }) {
  const { user } = useUserAuthStore();
  const registerTeacherMutation = useRegisterTeacher();

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submitData = {
      user_id: user.user_id,
      academy_key: data.get('academykey'),
      role: 'TEACHER',
    };

    // console.log(submitData);
    registerTeacherMutation.mutate(submitData, {
      onSuccess: () => {
        setStatus(3);
      },
      onError: (error) => {
        setIsError(true);
        if (error.errorCode === 404) {
          setErrorMsg('학원을 찾을 수 없습니다. 초대키를 확인해주세요.');
        } else if (error.errorCode === 409) {
          setErrorMsg('이미 등록 요청된 상태입니다.');
        } else if (error.errorCode === 500) {
          setErrorMsg('등록 요청 중 오류가 발생했습니다.');
        }
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={5}>
      <Typography variant="h5" align="center" mb={10}>
        강사 등록
      </Typography>
      <TextField name="academykey" id="academykey" label="학원 초대키" required fullWidth />
      {isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMsg}
        </Alert>
      )}
      <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
        등록 요청하기
      </Button>
      <Button size="large" fullWidth onClick={handleSignOut}>
        로그아웃
      </Button>
    </Box>
  );
}

function AfterRegister({ handleSignOut }) {
  return (
    <>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            등록 요청 성공!
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            등록 요청이 완료되었습니다. <br />
            승인될 때까지 대기해주세요.
          </Typography>
        </Grid>
      </Grid>
      <Button size="large" onClick={handleSignOut} sx={{ mt: 10 }}>
        로그아웃
      </Button>
    </>
  );
}
