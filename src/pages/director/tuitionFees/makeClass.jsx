import React, { useState } from 'react';

import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Button, Box, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Add } from '@mui/icons-material';

const classes = [
  { name: '수학 집중반', fee: 270000, period: '30' },
  { name: '토익반', fee: 150000, period: '60' },
  { name: '국어 집중반', fee: 250000, period: '30' },
];

export default function MakeClass() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="h6" sx={{ pt: 2, pb: 3 }}>
        학원비 구성
      </Typography>
      <TableContainer component={Paper} sx={{ width: '70vw', maxHeight: '70vh', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>수강반 이름</TableCell>
              <TableCell align="right">기간 (일)</TableCell>
              <TableCell align="right">가격</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((c) => (
              <TableRow key={c.name}>
                <TableCell>{c.name}</TableCell>
                <TableCell align="right">{c.period}</TableCell>
                <TableCell align="right">{c.fee}</TableCell>
                <TableCell sx={{ width: '25%' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <Button variant="outlined">수정</Button>
                    </Grid>
                    <Grid item xs={4}>
                      <Button variant="contained">삭제</Button>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'fixed', right: '3vw', bottom: '3vh' }}>
        <Button variant="contained" size="large" startIcon={<Add />} onClick={handleOpenDialog}>
          수강반 추가
        </Button>
      </Box>
      <Dialog component="form" open={open} onClose={handleCloseDialog}>
        <DialogTitle>수강반 추가</DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField label="수강반 이름" required fullWidth sx={{ mb: 2 }} />
          <TextField label="기간 (일)" type="number" required fullWidth sx={{ mb: 2 }} />
          <TextField label="가격" type="number" required fullWidth sx={{ mb: 2 }} />
        </DialogContent>
        <DialogActions sx={{ m: 3 }}>
          <Button variant="outlined" onClick={handleCloseDialog}>
            취소
          </Button>
          <Button type="submit" variant="contained">
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
