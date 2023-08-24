import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

const AppCoinLog = () => {
  const { coinLogs } = useContext(AuthContext);
  return (
    <div className="App">
      {/* コインログをリスト形式で表示 */}
      <ul>
        {coinLogs.map((coinLog) => {
          // todo - 日付の表示
          return (
            <li key={coinLog.id}>
              {coinLog.amount} /{coinLog.created_at} /
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AppCoinLog;
