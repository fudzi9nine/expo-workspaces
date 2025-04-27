import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import MainButton from '../../shared/mainButton';
import {useRouter} from 'expo-router';
import {FONTS} from '@/contstants/Styles';

export default function NoCourseView() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <Image source={require('@/assets/images/book.png')} style={styles.image} />
        <Text style={styles.text}>You Don't Have Any Course</Text>

        <MainButton text="Create New Course" onPress={() => router.push('/addCourse')} />
        <MainButton text="Explore Existing Courses" type="outline" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    height: 200,
    width: 200
  },
  text: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25
  }
});
