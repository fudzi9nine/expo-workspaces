import Header from '@/components/shared/header';
import MainButton from '@/components/shared/mainButton';
import {auth, db} from '@/config/firebaseConfig';
import {useUserDetailContext} from '@/context/userDetailContext';
import {COLORS, FONTS} from '@/contstants/Styles';
import UserDetail from '@/types/UserDetail';
import {useRouter} from 'expo-router';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {useCallback, useState} from 'react';
import {Image, Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignIn() {
  const router = useRouter();

  const {updateUserDetail} = useUserDetailContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUserDetail = useCallback(async () => {
    const response = await getDoc(doc(db, 'users', email));
    updateUserDetail(response.data() as UserDetail);
  }, [email, updateUserDetail]);

  const onSignIn = useCallback(async () => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await getUserDetail();

      router.replace('/(tabs)/home');
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [email, getUserDetail, password, router]);

  const onGoBack = useCallback(() => {
    router.replace('/auth');
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onGoBack={onGoBack} />

      <Image style={styles.image} source={require('@/assets/images/logo.png')} />

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={text => setEmail(text)} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      <MainButton isLoading={isLoading} text="Sign In" onPress={onSignIn} />

      <View style={styles.signIn}>
        <Text style={styles.signInText}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.signInPressable}>Create New Here</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  image: {
    width: 180,
    height: 180
  },
  title: {
    fontSize: 30,
    fontFamily: FONTS.DEFAULT_BOLD
  },
  input: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginVertical: 10,
    borderRadius: 8
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20
  },
  signInText: {
    fontFamily: FONTS.DEFAULT
  },
  signInPressable: {
    color: COLORS.PRIMARY,
    fontFamily: FONTS.DEFAULT_BOLD
  }
});
