import Loader from '@/components/shared/loader';
import {useCourseListContext} from '@/context/courseListContext';
import {useUserDetailContext} from '@/context/userDetailContext';
import {useRouter} from 'expo-router';
import {useEffect} from 'react';

export default function Index() {
  const router = useRouter();

  const {userDetail, isLoading: isUserDetailsLoading} = useUserDetailContext();
  const {isLoading: isCourseListLoading} = useCourseListContext();

  useEffect(() => {
    if (isUserDetailsLoading || isCourseListLoading) {
      return;
    }

    if (!userDetail) {
      router.replace('/auth');
    } else {
      router.replace('/(tabs)/home');
    }
  }, [isCourseListLoading, isUserDetailsLoading, router, userDetail]);

  return <Loader />;
}
