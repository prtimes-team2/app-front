import * as React from 'react';
import { Header } from '../components/Home/Header';
import { AddFab } from '../components/common/AddFab';
import { Filter } from '../components/common/Filter';

const AppHome = () => {
  const [prefecture, setPrefecture] = React.useState('');
  const [city, setCity] = React.useState('');

  return (
    <div className="App">
      <Header />
      <Filter
        prefecture={prefecture}
        setPrefecture={setPrefecture}
        city={city}
        setCity={setCity}
      />

      <AddFab />
    </div>
  );
};

export default AppHome;
