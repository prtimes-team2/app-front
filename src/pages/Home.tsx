import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

const AppHome = () => {
  const { profile, isLogIn } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        アプリ画面{isLogIn ? 'ログイン中' : 'ログインしていません'}
        {profile ? profile.displayName : 'no profile'}
      </header>
    </div>
  );
};

export default AppHome;
