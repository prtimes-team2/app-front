import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';

import { theme } from './theme';
import { Main } from './components/Main';

const App = () => {
  const [cliant] = useState(() => new QueryClient());
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={cliant}>
        <Main />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
