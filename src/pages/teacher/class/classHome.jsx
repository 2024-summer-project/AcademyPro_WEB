import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import { TitleMedium } from '../../../components';

export default function ClassHome() {
  const navigate = useNavigate();
  const courses = [
    { id: 1, name: '미적분', students: 60 },
    { id: 2, name: '확률과통계', students: 30 },
    { id: 3, name: '영어', students: 20 },
    { id: 4, name: '국어', students: 55 },
  ];

  function handleClickDetails(course) {
    navigate(`/teacher/class/${course.id}`);
  }

  return (
    <>
      <TitleMedium title="강의 목록" />
      <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        {courses.map((course) => (
          <ListItem
            key={course.id}
            sx={{ height: 120, marginY: 2, backgroundColor: 'lightgrey' }}
            onClick={() => {
              handleClickDetails(course);
            }}
          >
            <ListItemText primary={course.name} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <ListItemText align="right" secondary={`수강 인원: ${course.students}`} sx={{ mb: 2 }} />
            </Box>
          </ListItem>
        ))}
      </List>
    </>
  );
}
