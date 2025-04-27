import {Text, StyleSheet, Image} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainButton from '@/components/shared/mainButton';
import {COLORS, FONTS} from '@/contstants/Styles';
import {useUserDetailContext} from '@/context/userDetailContext';
import {signOut} from 'firebase/auth';
import {auth} from '@/config/firebaseConfig';
import {useRouter} from 'expo-router';

export default function Profile() {
  const router = useRouter();
  const {userDetail} = useUserDetailContext();

  const logOut = useCallback(async () => {
    try {
      await signOut(auth);
      router.replace('/auth');
    } catch (e) {
      console.log(e);
    }
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/logo.png')} />
      <Text style={styles.title}>{userDetail.fullName}</Text>
      <Text style={styles.subtitle}>{userDetail.email}</Text>
      <MainButton text="Log Out" onPress={logOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 25,
    paddingVertical: 10,
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 300
  },
  title: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25,
    textAlign: 'center'
  },
  subtitle: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 20,
    paddingTop: 5,
    textAlign: 'center'
  }
});
