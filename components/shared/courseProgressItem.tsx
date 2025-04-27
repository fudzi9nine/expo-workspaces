import {View, Text, Image, StyleSheet, TouchableOpacity, DimensionValue} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '@/contstants/Styles';
import {IMAGE_ASSETS} from '@/contstants/Option';
import Course from '@/types/Course';
import {useRouter} from 'expo-router';
import {useUserDetailContext} from '@/context/userDetailContext';

type Props = {
  course: Course;
  width?: DimensionValue;
};

export default function CourseProgressItem({course, width}: Props) {
  const router = useRouter();

  const {userDetail} = useUserDetailContext();

  const completedChapters = course.completedChapters[userDetail.uid] || [];

  return (
    <TouchableOpacity
      onPress={() => router.push({pathname: '/courseInfo', params: {courseId: course.courseId}})}
      style={[styles.courseContainer, {width}]}>
      <View style={styles.courseInnerContainer}>
        <Image style={styles.courseImg} source={IMAGE_ASSETS[course.banner_image]} />

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle} numberOfLines={2}>
            {course.courseName}
          </Text>

          <Text style={styles.descriptionSubtitle}>{course.chapters.length} Chapters</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.filledProgressBar, {width: `${(completedChapters.length / course.chapters.length) * 100}%`}]}
          />
        </View>

        <Text style={styles.progressText}>
          {completedChapters.length} chapters out of {course.chapters.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: 7,
    width: '100%'
  },
  courseInnerContainer: {
    flexDirection: 'row',
    height: 80,
    gap: 8
  },
  courseImg: {
    height: 80,
    width: 80,
    borderRadius: 7
  },
  descriptionContainer: {
    flex: 1,
    padding: 10
  },
  descriptionTitle: {
    flex: 1,
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 15
  },
  descriptionSubtitle: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 12
  },
  progressContainer: {
    padding: 10,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY,
    borderWidth: 1,
    marginTop: -7,
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  progressBar: {
    height: 20,
    marginBottom: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    overflow: 'hidden'
  },
  filledProgressBar: {
    backgroundColor: COLORS.PRIMARY,
    height: '100%'
  },
  progressText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.DEFAULT
  }
});
