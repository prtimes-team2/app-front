import { Box, Container } from '@mui/material';
import * as React from 'react';

import { Filter } from '../common/Filter';
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
  const { favoriteIds } = useContext(AuthContext);

  const [address, setAddress] = React.useState('');

  React.useEffect(() => {}, [address]);

  const { reports, questions } = React.useContext(AuthContext);
  return (
    <>
      <CustomTabPanel value={value} index={0}>
        <Box display="flex" justifyContent="flex-end">
          <Filter filterKey="home" setAddress={setAddress} />
        </Box>
        {/* reportsを.mapして、MainCardに入れる*/}
        <Container maxWidth="sm" sx={{ mt: 1, paddingBottom: '35px' }}>
          {reports.map((report) => (
            <MainCard
              key={report.id}
              postKey={report.id}
              image="https://source.unsplash.com/random"
              title={report.title}
              detail={report.content}
              address={report.address}
              isFavorite={favoriteIds.includes(report.id)}
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
              postKey={question.id}
              image="https://source.unsplash.com/random"
              address={question.address}
              title={question.content}
              detail={question.city}
              isFavorite={favoriteIds.includes(question.id)}
            />
          ))}
        </Container>
      </CustomTabPanel>
    </>
  );
};
