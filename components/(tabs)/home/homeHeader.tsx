import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useUserDetailContext} from '@/context/userDetailContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS, FONTS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';

export default function HomeHeader() {
  const router = useRouter();
  const {userDetail} = useUserDetailContext();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Hello, {userDetail.fullName} </Text>
        <Text style={styles.text}>Let's get started!</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.navigate('/(tabs)/profile');
        }}>
        <Ionicons name="settings-outline" size={32} color={COLORS.BLACK} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25
  },
  text: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 17
  }
});
