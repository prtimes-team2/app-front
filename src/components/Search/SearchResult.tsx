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
              image={item.imageUrls[0]}
              title={item.title}
              address={item.address}
              detail={item.content}
              isFavorite={favoriteIds.includes(item.id)}
              userId={item.user_id}
            />
          );
        })}
      </Container>
    </div>
  );
};
