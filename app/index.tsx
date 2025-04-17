import {COLORS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/landing.png')} />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Couching Guru</Text>
        <Text style={styles.subtitle}>
          Transform your ideas into engaging educational content, effortlessly with AI!
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.buttonTitle}>Get started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signInButton]} onPress={() => router.push('/auth/signIn')}>
          <Text style={[styles.buttonTitle, styles.signInButtonTitle]}>Already have an Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 70
  },
  content: {
    padding: 25,
    backgroundColor: COLORS.PRIMARY,
    height: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'outfitBold',
    textAlign: 'center',
    color: COLORS.WHITE
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'outfit',
    color: COLORS.WHITE
  },
  button: {
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'outfit',
    color: COLORS.PRIMARY
  },
  signInButton: {
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.PRIMARY
  },
  signInButtonTitle: {
    color: COLORS.WHITE
  }
});
