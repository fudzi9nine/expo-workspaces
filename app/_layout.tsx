import {Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import UserDetailContextProvider from '@/context/userDetailContext';
import CourseListContextProvider from '@/context/courseListContext';
import {BackHandler} from 'react-native';
import {useEffect} from 'react';

export default function RootLayout() {
  useFonts({
    outfit: require('@/assets/fonts/Outfit-Regular.ttf'),
    outfitBold: require('@/assets/fonts/Outfit-Bold.ttf')
  });

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });

    return () => subscription.remove();
  }, []);

  return (
    <UserDetailContextProvider>
      <CourseListContextProvider>
        <Stack screenOptions={{headerShown: false}} />
      </CourseListContextProvider>
    </UserDetailContextProvider>
  );
}
