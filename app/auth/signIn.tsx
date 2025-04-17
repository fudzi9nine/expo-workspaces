import {COLORS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';
import {Image, Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable} from 'react-native';

export default function SignIn() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/logo.png')} />

      <Text style={styles.title}>Welcome Back</Text>

      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.signIn}>
        <Text style={styles.signInText}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.signInPressable}>Create New Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 25,
    paddingTop: 100,
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  image: {
    width: 180,
    height: 180
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfitBold'
  },
  input: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8
  },
  button: {
    padding: 15,
    backgroundColor: COLORS.PRIMARY,
    width: '100%',
    marginTop: 25,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  signIn: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20
  },
  signInText: {
    fontFamily: 'outfit'
  },
  signInPressable: {
    color: COLORS.PRIMARY,
    fontFamily: 'outfit-bold'
  }
});
