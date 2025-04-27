import {View, Text, TouchableOpacity, Image, StyleSheet, DimensionValue} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS, FONTS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';
import {IMAGE_ASSETS} from '@/contstants/Option';
import Course from '@/types/Course';

type Props = {
  course: Course;
  width?: DimensionValue;
};

export default function CourseItem({course, width}: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={course.createdOn.toString()}
      onPress={() => router.push({pathname: '/courseInfo', params: {courseId: course.courseId}})}
      style={[styles.courseContainer, {width}]}>
      <Image source={IMAGE_ASSETS[course.banner_image]} style={[styles.courseImg, {width}]} />
      <View style={styles.courseDescription}>
        <Text style={styles.courseTitle}>{course.courseName}</Text>
        <View style={styles.courseChapters}>
          <Ionicons name="book-outline" size={20} color={COLORS.BLACK} />

          <Text style={styles.courseChaptersText}>{course.chapters.length} Chapters</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: 15,
    width: '100%'
  },
  courseImg: {
    width: '100%',
    height: 150,
    borderRadius: 15
  },
  courseDescription: {
    padding: 10
  },
  courseTitle: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 18
  },
  courseChapters: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5,
    alignItems: 'center'
  },
  courseChaptersText: {
    fontFamily: FONTS.DEFAULT
  }
});
