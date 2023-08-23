import type { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

type HomeTown = {
  // 都道府県
  prefecture: string;
  // 市区町村
  city: string;
};

class AuthContextProps {
  isLogIn = false;
  isError = false;
  profile: Profile | null = null;
  homeTown: HomeTown | null = null;
  hasHomeTown = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProfile: (profile: Profile | null) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHomeTown: (homeTown: HomeTown | null) => void = () => {};
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
  const [homeTown, setHomeTownState] = useState<HomeTown | null>(() => null);
  const [hasHomeTown, setHasHomeTown] = useState<boolean>(() => false);
  const isError = profile === null;

  const setProfile = async (value: Profile | null) => {
    setLogIn(!!value);
    setProfileState(value);
  };

  const setHomeTown = async (value: HomeTown | null) => {
    setHasHomeTown(!!value);
    setHomeTownState(value);
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
        liff.login();
        setProfile(await liff.getProfile());
        await getUser();
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
      }
    } catch (err) {
      handleError(err);
    }
  };

  const getUser = async () => {
    console.log('start getUser');
    // APIにリクエストを行う

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

      console.log(baseUrl, 'baseUrl');

      // ここでAPIにリクエストを行う
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: 'idToken' }),
      };

      const res = await fetch(baseUrl + '/line', options);

      setHomeTown({
        prefecture: '東京都',
        city: '渋谷区',
      });
    } catch (err) {
      // APIのリクエストが失敗した時は、ログイン画面に戻す
      console.log('getUser error');
      console.log(err);
    }
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
        homeTown,
        hasHomeTown,
        setHomeTown,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
