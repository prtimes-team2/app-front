import { Header } from '../components/Home/Header';
import { AddFab } from '../components/common/AddFab';

const AppHome = () => {
  return (
    <div className="App" style={{ paddingBottom: '56px' }}>
      <Header />
      <AddFab />
    </div>
  );
};

export default AppHome;
