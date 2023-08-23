import { Container } from '@mui/material';
import { Report } from '../../types/report';
import { MainCard } from '../common/MainCard';

export const SearchResult = (props: { result: Report[] }) => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        {props.result.map((item) => {
          return (
            <MainCard
              key={item.id}
              image="https://source.unsplash.com/random"
              title={item.id}
              detail="test"
            />
          );
        })}
      </Container>
    </div>
  );
};
