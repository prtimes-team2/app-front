import type { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

class AuthContextProps {
  isLogIn = false;
  isError = false;
  profile: Profile | null = null;
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
        liff.login();
        setProfile(await liff.getProfile());
      } else {
        await liff.init({ liffId, withLoginOnExternalBrowser: true });
        if (!liff.isLoggedIn()) {
          console.log('not LINEApp and not LoggedIn');
          console.log('star:login');
          liff.login({});
          return;
        }
        setProfile(await liff.getProfile());
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    liffInit();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogIn, isError, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
