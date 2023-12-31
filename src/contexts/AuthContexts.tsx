import type { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CoinLog } from '../types/coinLog';
import { Question, SelfQuestion } from '../types/questions';
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
  selfQuestions: SelfQuestion[] = [];
  favoriteIds: number[] = [];
  coinLogs: CoinLog[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfile: (profile: Profile | null) => void = () => {};
  setFavorite: (newValue: boolean, reportId: number) => void = () => {};
  setSelfQuestions: (newValue: SelfQuestion[]) => void = () => {};
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
  const [selfQuestions, setSelfQuestions] = useState<SelfQuestion[]>(() => []);
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => []);
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
      console.log('---------------- res ------------');
      console.log(res);
      console.log('---------------- res ------------');

      if (!res.ok) {
        console.log('res is not ok');
        const text = await res.text();
        console.log(text);
        return;
      }
      const resData = await res.json();
      console.log('---------------- resData ------------');
      console.log(resData);
      console.log('---------------- resData ------------');

      const userData = resData['User'] as User;
      setUser(userData);

      console.log('---------------- userData ------------');
      console.log(userData);
      console.log('---------------- userData ------------');

      // 地元が登録されているかどうかを確認
      if (!userData.prefecture || !userData.city) {
        setHasHomeTown(false);
        console.log('地元が登録されていません');
        // register画面に遷移する
        navigate('/register');
        return;
      }

      const reports = resData['Reports'] as Report[];
      console.log('---------------- reports ------------');
      console.log(reports);
      console.log('---------------- reports ------------');

      const FavoriteReports = resData['FavoriteReports'] as Report[];
      console.log('---------------- FavoriteReports ------------');
      console.log(FavoriteReports);
      console.log('---------------- FavoriteReports ------------');

      const MyReports = resData['MyReports'] as Report[];
      console.log('---------------- MyReports ------------');
      console.log(MyReports);
      console.log('---------------- MyReports ------------');

      // 3つをくっつける
      const allReports = reports.concat(FavoriteReports ?? [], MyReports ?? []);

      // 同じidのものを削除する
      const uniqueReports = allReports.filter(
        (element, index, self) =>
          self.findIndex((e) => e.id === element.id) === index
      );

      console.log('---------------- allReports ------------');
      console.log(uniqueReports);
      console.log('---------------- allReports ------------');

      if (allReports) {
        setReports(uniqueReports);
      } else {
        setReports([]);
      }

      // favotiteしている配列を作成する
      const favIds: number[] = [];
      if (FavoriteReports) {
        for (const report of FavoriteReports) {
          favIds.push(report.id);
        }
      }
      setFavoriteIds(favIds);

      const coinLogs = resData['Coinlogs'] as CoinLog[];
      console.log('---------------- coinLogs ------------');
      console.log(coinLogs);
      console.log('---------------- coinLogs ------------');

      if (coinLogs) {
        setCoinLogs(coinLogs);
      } else {
        setCoinLogs([]);
      }

      // 自分の質問を取得する
      await getSelfQuestions(idToken);
      // 質問を取得する
      await getQuestion(idToken, userData);
    } catch (err) {
      // APIのリクエストが失敗した時は、ログイン画面に戻す
      console.log('getUser error');
      console.log(err);
    }
  };

  const setFavorite = async (newValue: boolean, reportId: number) => {
    console.log('setFavorite');
    console.log(newValue);
    console.log(reportId);
    // setFavoriteIdsを更新する
    // newValueがtrueの時は、reportIdを追加する
    // newValueがfalseの時は、reportIdを削除する
    const newFavoriteIds = [...favoriteIds];
    if (newValue) {
      newFavoriteIds.push(reportId);
    }
    if (!newValue) {
      const index = newFavoriteIds.indexOf(reportId);
      if (index > -1) {
        newFavoriteIds.splice(index, 1);
      }
    }
    setFavoriteIds(newFavoriteIds);
  };

  const getQuestion = async (idToken: string, userData: User) => {
    if (userData.prefecture == null || userData.city == null) {
      console.log('prefecture', userData.prefecture);
      console.log('city', userData.city);
      console.log('prefecture or city is undefined');
      return;
    }

    // 質問を取得する
    // APIにリクエスト
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // /questionにリクエスト
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    // /questionにリクエスト
    const res = await fetch(
      baseUrl +
        '/question' +
        `?idToken=${idToken ?? 'id_token'}&prefecture=${
          userData.prefecture
        }&city=${userData.city}`,
      options
    );
    console.log(userData.prefecture);
    console.log(userData.city);

    if (!res.ok) {
      console.log('res is not ok');
      const text = await res.text();
      console.log(text);
      setQuestions([]);
      return;
    }

    const resData = (await res.json()) as Question[];
    console.log(' ---------------- question ----------------');
    console.log(resData);
    console.log(' ---------------- question ----------------');
    setQuestions(resData);
  };

  const getSelfQuestions = async (idToken: string) => {
    // 自分の質問を取得する
    // APIにリクエスト
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    if (!baseUrl) {
      console.log('baseUrl is undefined');
      return;
    }

    // /question/selfにリクエスト
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(
      baseUrl + '/question/self' + `?idToken=${idToken ?? 'id_token'}`,
      options
    );
    const resData = (await res.json()) as SelfQuestion[];
    console.log(' ---------------- selfQuestion ----------------');
    console.log(resData);
    console.log(' ---------------- selfQuestion ----------------');
    setSelfQuestions(resData);
  };

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
        favoriteIds,
        coinLogs,
        setFavorite,
        selfQuestions,
        setSelfQuestions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
