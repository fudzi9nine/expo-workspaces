import {Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '@/contstants/Styles';
import {COURSE_CATEGORY_LIST} from '@/contstants/Option';
import Category from '@/components/explore/category';

export default function Explore() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <Text style={styles.title}>Explore New Courses</Text>

        {COURSE_CATEGORY_LIST.map(category => (
          <Category key={category} category={category} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  innerContainer: {
    paddingHorizontal: 25
  },
  title: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25,
    paddingTop: 15
  },

  categoryContainer: {
    marginTop: 10
  },
  categoryTitle: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 20
  }
});
