import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import { TextField, Box, Grid, Button } from '@mui/material';
import { AttachFile } from '@mui/icons-material';

import { TitleMedium, SubmitButtons } from '../../../components';

const oldTitle = '8월 정기고사 안내';
const oldContent = '안녕하세요. \n1학기 마지막 정기고사 안내입니다. \n...';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function UpdateNotice() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTitle = e.currentTarget.title.value;
    const newContent = e.currentTarget.content.value;

    if (newTitle.length === 0) {
      alert('제목을 입력해주세요.');
    } else if (newContent.length === 0) {
      alert('내용을 입력해주세요.');
    } else {
      console.log(newTitle);
      console.log(newContent);

      navigate('/director/notice');
    }
  };

  return (
    <>
      <TitleMedium title="공지사항 수정" />
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 3, width: '60vw' }}>
          <Grid item xs={12}>
            <TextField name="title" label="제목" fullWidth defaultValue={oldTitle} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="content" label="내용" fullWidth multiline rows={14} defaultValue={oldContent} />
          </Grid>
          <Grid item xs={12}>
            <Button component="label" role={undefined} tabIndex={-1} startIcon={<AttachFile />}>
              파일 첨부
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => console.log(e.target.files)} multiple />
            </Button>
          </Grid>
        </Grid>
        <SubmitButtons submitTitle="수정 완료" />
      </Box>
    </>
  );
}
