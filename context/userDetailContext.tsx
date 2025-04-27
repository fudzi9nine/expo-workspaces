import {auth, db} from '@/config/firebaseConfig';
import UserDetail from '@/types/UserDetail';
import {onAuthStateChanged} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react';

interface UserDetailContextType {
  isLoading: boolean;
  userDetail: UserDetail;
  updateUserDetail: (user: UserDetail) => void;
}

const UserDetailContext = createContext<UserDetailContextType>({} as UserDetailContextType);

type Props = PropsWithChildren;

export default function UserDetailContextProvider({children}: Props) {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const updateUserDetail = useCallback((user: UserDetail) => {
    setUserDetail(user);
  }, []);

  useEffect(() => {
    const stopListener = onAuthStateChanged(auth, async user => {
      setIsLoading(true);
      if (user && user.email) {
        const response = await getDoc(doc(db, 'users', user.email));
        setUserDetail(response.data() as UserDetail);
      }

      setIsLoading(false);
    });
    return stopListener;
  }, [updateUserDetail]);

  return (
    <UserDetailContext.Provider value={{isLoading, userDetail: userDetail as UserDetail, updateUserDetail}}>
      {children}
    </UserDetailContext.Provider>
  );
}

export function useUserDetailContext() {
  const userDetailContext = useContext(UserDetailContext);
  return userDetailContext;
}
