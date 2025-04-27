import Header from '@/components/shared/header';
import MainButton from '@/components/shared/mainButton';
import {auth, db} from '@/config/firebaseConfig';
import {useUserDetailContext} from '@/context/userDetailContext';
import {COLORS, FONTS} from '@/contstants/Styles';
import UserDetail from '@/types/UserDetail';
import {useRouter} from 'expo-router';
import {createUserWithEmailAndPassword, User} from 'firebase/auth';
import {setDoc, doc} from 'firebase/firestore';
import {useCallback, useState} from 'react';
import {Image, Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignUp() {
  const router = useRouter();

  const {updateUserDetail} = useUserDetailContext();

  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveUser = useCallback(
    async (user: User) => {
      const newUser: UserDetail = {
        fullName,
        email,
        member: false,
        uid: user.uid
      };

      await setDoc(doc(db, 'users', email), newUser);

      updateUserDetail(newUser);
    },
    [email, fullName, updateUserDetail]
  );

  const createNewAccount = useCallback(async () => {
    setIsLoading(true);

    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      await saveUser(user);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, [email, password, saveUser]);

  const onGoBack = useCallback(() => {
    router.replace('/auth');
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <Header onGoBack={onGoBack} />
      <Image style={styles.image} source={require('@/assets/images/logo.png')} />

      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        autoCapitalize="none"
        onChangeText={text => setFullName(text)}
      />
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={text => setEmail(text)} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
        onChangeText={text => setPassword(text)}
      />

      <MainButton isLoading={isLoading} text="Sign In" onPress={createNewAccount} />

      <View style={styles.signIn}>
        <Text style={styles.signInText}>Already have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signIn')}>
          <Text style={styles.signInPressable}>Sign In Here</Text>
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
