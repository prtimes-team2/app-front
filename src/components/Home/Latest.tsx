import { Container } from '@mui/material';
import { MainCard } from '../common/MainCard';

export const Latest = () => {
  return (
    <Container maxWidth="sm">
      <MainCard
        image="https://source.unsplash.com/random"
        title="Test"
        detail="testtesttesttesttesttesttesttesttesttesttesttesttest"
      />
      <MainCard
        image="https://source.unsplash.com/random"
        title="Test"
        detail="testtesttesttesttesttesttesttesttesttesttesttesttest"
      />
    </Container>
  );
};
