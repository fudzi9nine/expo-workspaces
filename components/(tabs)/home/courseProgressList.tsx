import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Course from '@/types/Course';
import {FONTS} from '@/contstants/Styles';
import CourseProgressItem from '@/components/shared/courseProgressItem';

type Props = {
  courseList: Course[];
};

export default function CourseProgressList({courseList}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>

      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => <CourseProgressItem course={item} width={300} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  title: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25
  },
  listContainer: {
    marginTop: 6,
    gap: 7
  }
});
