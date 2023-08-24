import type { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CoinLog } from '../types/coinLog';
import { Favorite } from '../types/favorite';
import { Question } from '../types/questions';
import { Report } from '../types/report';
import { User } from '../types/user';

class AuthContextProps {
  isLogIn = false;
  isError = false;
  profile: Profile | null = null;
  hasHomeTown = false;
  user: User | null = null;
  reports: Report[] = [];
  questions: Question[] = [];
  favorites: Favorite[] = [];
  coinLogs: CoinLog[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfile: (profile: Profile | null) => void = () => {};
}

export const AuthContext = createContext<AuthContextProps>(
  new AuthContextProps()
);

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isLogIn, setLogIn] = useState(false);
  const [profile, setProfileState] = useState<Profile | null>(() => null);
  const [hasHomeTown, setHasHomeTown] = useState<boolean>(() => false);
  const [user, setUser] = useState<User | null>(() => null);
  const [reports, setReports] = useState<Report[]>(() => []);
  const [questions, setQuestions] = useState<Question[]>(() => []);
  const [favorites, setFavorites] = useState<Favorite[]>(() => []);
  const [coinLogs, setCoinLogs] = useState<CoinLog[]>(() => []);
  const navigate = useNavigate();

  const isError = profile === null;

  const setProfile = async (value: Profile | null) => {
    setLogIn(!!value);
    setProfileState(value);
  };

  const liffId = process.env.REACT_APP_LIFF_ID;
  if (!liffId) {
    console.log('liffId is undefined');
    return <></>;
  }

  const liffInit = async () => {
    console.log('start liffInit');
    const handleError = (err: unknown) => {
      console.log(err);
      setProfile(null);
    };

    try {
      if (process.env.NODE_ENV === 'development') {
        liff.use(new LiffMockPlugin());
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await liff.init({ liffId, mock: true });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        liff.$mock.set((p) => ({
          ...p,
          getProfile: {
            displayName: 'Brown',
            userId: '123456789',
            statusMessage: 'hello',
            pictureUrl:
              'https://firebasestorage.googleapis.com/v0/b/prtimes-team-2.appspot.com/o/images%2Ftest%2Fchar_brown.85af1dc9.png?alt=media&token=327fae2e-c37f-4df8-885b-31649b977e88',
          },
        }));
        liff.login();
        setProfile(await liff.getProfile());
        await getUser('id_token');
      } else {
        await liff.init({ liffId, withLoginOnExternalBrowser: true });
        if (!liff.isLoggedIn()) {
          console.log('not LINEApp and not LoggedIn');
          console.log('star:login');
          liff.login({});
          return;
        }
        setProfile(await liff.getProfile());
        console.log('idToken', liff.getIDToken());
        const idToken = liff.getIDToken();
        if (!idToken) {
          console.log('idToken is undefined');
          return;
        }
        await getUser(idToken);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const getUser = async (idToken: string) => {
    console.log('start getUser');
    try {
      // リクエストを行う
      // ユーザーが取得する
      // 地元情報が保存されているかどうかを確認
      // 地元情報が保存されている場合は、地元情報を取得する
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      if (!baseUrl) {
        console.log('baseUrl is undefined');
        return;
      }

      // APIにリクエスト
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      };

      const res = await fetch(baseUrl + '/user/login', options);
      const resData = await res.json();

      const userData = resData['User'] as User;
      setUser({ ...userData, prefecture: '22', city: '22210' });

      // 地元が登録されているかどうかを確認
      if (userData.prefecture == null || userData.city == null) {
        setHasHomeTown(false);
        console.log('地元が登録されていません');
        // register画面に遷移する

        navigate('/register');
        return;
      }

      const reports = resData['Reports'] as { [key: string]: Report };
      if (!reports) {
        throw new Error('reports is undefined');
      }
      setReports(transformToArr(reports));

      const questions = resData['Questions'] as { [key: string]: Question };
      if (!questions) {
        throw new Error('questions is undefined');
      }
      setQuestions(transformToArr(questions));

      const favorites = resData['Favorites'] as { [key: string]: Favorite };
      if (!favorites) {
        console.log(resData, 'resData');
        console.log(resData['Favorite'], 'Favorite');
        throw new Error('favorites is undefined');
      }

      setFavorites(transformToArr(favorites));

      const coinLogs = resData['CoinLogs'] as { [key: string]: CoinLog };
      if (!coinLogs) {
        throw new Error('coinLogs is undefined');
      }

      setCoinLogs(transformToArr(coinLogs));
    } catch (err) {
      // APIのリクエストが失敗した時は、ログイン画面に戻す
      console.log('getUser error');
      console.log(err);
    }
  };

  function transformToArr<T>(data: { [key: string]: T }): Array<T> {
    return Object.keys(data).map((key) => data[key]);
  }

  useEffect(() => {
    liffInit();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogIn,
        isError,
        profile,
        setProfile,
        hasHomeTown,
        user,
        reports,
        questions,
        favorites,
        coinLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
