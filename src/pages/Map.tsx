import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

const AppMap = () => {
  const { profile, isLogIn } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        マップ画面だよ{isLogIn ? 'ログイン中' : 'ログインしていません'}
        {profile ? profile.displayName : 'no profile'}
      </header>
    </div>
  );
};

export default AppMap;
