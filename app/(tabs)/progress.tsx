import {Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {useCourseListContext} from '@/context/courseListContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '@/contstants/Styles';
import CourseProgressItem from '@/components/shared/courseProgressItem';

export default function Progress() {
  const {courseList} = useCourseListContext();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={courseList}
        renderItem={({item}) => <CourseProgressItem course={item} />}
        ListHeaderComponent={<Text style={styles.title}>Progress</Text>}
        contentContainerStyle={styles.innerContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  innerContainer: {
    paddingHorizontal: 25,
    gap: 10
  },
  title: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25,
    paddingTop: 15
  }
});
