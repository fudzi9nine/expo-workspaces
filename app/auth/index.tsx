import MainButton from '@/components/shared/mainButton';
import {COLORS, FONTS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';
import {Text, View, StyleSheet, Image} from 'react-native';

export default function Auth() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/landing.png')} />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>Welcome to Couching Guru</Text>
          <Text style={styles.subtitle}>
            Transform your ideas into engaging educational content, effortlessly with AI!
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <MainButton text="Get started" type="outline" onPress={() => router.push('/auth/signUp')} />
          <MainButton
            text="Already have an Account?"
            onPress={() => router.push('/auth/signIn')}
            style={styles.signInButton}
          />
        </View>
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
    flex: 1,
    padding: 25,
    backgroundColor: COLORS.PRIMARY,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: FONTS.DEFAULT_BOLD,
    textAlign: 'center',
    color: COLORS.WHITE
  },
  subtitle: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: FONTS.DEFAULT,
    color: COLORS.WHITE
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  signInButton: {
    borderColor: '#fff',
    borderWidth: 1
  }
});
