import { useState } from 'react';
import { Main } from './components/Main';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const App = () => {
  const [cliant] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={cliant}>
      <Main />
    </QueryClientProvider>
  );
};

export default App;
