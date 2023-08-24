import { Box, Container } from '@mui/material';

import { MainCard } from '../common/MainCard';

import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1, pt: 2 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

type ContentProps = {
  value: number;
};

export const Content = ({ value }: ContentProps) => {
  const { reports, questions } = useContext(AuthContext);
  return (
    <>
      <CustomTabPanel value={value} index={0}>
        {/* reportsを.mapして、MainCardに入れる*/}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {reports.map((report) => (
            <MainCard
              key={report.id}
              image="https://source.unsplash.com/random"
              title={report.title}
              detail={report.content}
              // 一旦50%の確率でtrueにする
              isFavorite={Math.random() < 0.5}
            />
          ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {/* questionsを.mapしてMainCardに入れる */}
        <Container maxWidth="sm" sx={{ paddingBottom: '35px' }}>
          {questions.map((question) => (
            <MainCard
              key={question.id}
              image="https://source.unsplash.com/random"
              title={question.content}
              detail={question.city}
            />
          ))}
        </Container>
      </CustomTabPanel>
    </>
  );
};
