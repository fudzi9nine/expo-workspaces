import {StyleSheet, ScrollView} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useFocusEffect, useLocalSearchParams} from 'expo-router';
import Course from '@/types/Course';
import Intro from '@/components/courseInfo/intro';
import {COLORS} from '@/contstants/Styles';
import Chapters from '@/components/courseInfo/chapters';
import Loader from '@/components/shared/loader';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/config/firebaseConfig';
import {useUserDetailContext} from '@/context/userDetailContext';

export default function CourseInfo() {
  const {courseId} = useLocalSearchParams();
  const {userDetail} = useUserDetailContext();

  const [courseInfo, setCourseInfo] = useState<Course | null>(null);

  const getCourseInfo = useCallback(async () => {
    const docInfo = await getDoc(doc(db, 'courses', courseId as string));

    const course = docInfo.data() as Course;

    setCourseInfo(course);
  }, [courseId]);

  useFocusEffect(() => {
    getCourseInfo();
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.innerContainer}>
      {!courseInfo ? (
        <Loader />
      ) : (
        <>
          <Intro courseInfo={courseInfo} isEnroll={!courseInfo.enrolledUsers.includes(userDetail.uid)} />
          <Chapters courseInfo={courseInfo} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  innerContainer: {
    minHeight: '100%'
  }
});
