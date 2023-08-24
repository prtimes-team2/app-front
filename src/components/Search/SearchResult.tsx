import { Container } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContexts';
import { Report } from '../../types/report';
import { MainCard } from '../common/MainCard';

export const SearchResult = (props: { result: Report[] }) => {
  const { favoriteIds } = useContext(AuthContext);
  return (
    <div className="App">
      <Container maxWidth="sm">
        {props.result.map((item) => {
          return (
            <MainCard
              key={item.id}
              postKey={item.id}
              image="https://source.unsplash.com/random"
              title={item.author}
              address={item.address}
              detail={item.content}
              isFavorite={favoriteIds.includes(item.id)}
            />
          );
        })}
      </Container>
    </div>
  );
};
