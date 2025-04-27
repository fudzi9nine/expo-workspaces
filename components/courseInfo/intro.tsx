import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {IMAGE_ASSETS} from '@/contstants/Option';
import Course from '@/types/Course';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS, FONTS} from '@/contstants/Styles';
import MainButton from '../shared/mainButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../shared/header';
import {useRouter} from 'expo-router';
import {useUserDetailContext} from '@/context/userDetailContext';
import {arrayUnion, doc, updateDoc} from 'firebase/firestore';
import {db} from '@/config/firebaseConfig';
import {useCourseListContext} from '@/context/courseListContext';

type Props = {
  courseInfo: Course;
  isEnroll: boolean;
};

export default function Intro({courseInfo, isEnroll}: Props) {
  const router = useRouter();

  const {userDetail} = useUserDetailContext();
  const {addCourse} = useCourseListContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onEnroll = useCallback(async () => {
    setIsLoading(true);
    const newComplitedChapters = {...courseInfo.completedChapters, [userDetail.uid]: []};

    await updateDoc(doc(db, 'courses', courseInfo.courseId as string), {
      enrolledUsers: arrayUnion(userDetail.uid),
      completedChapters: newComplitedChapters
    });

    const newCourse = {
      ...courseInfo,
      enrolledUsers: [...courseInfo.enrolledUsers, userDetail.uid],
      completedChapters: newComplitedChapters
    };

    addCourse(newCourse);

    router.push('/(tabs)/home');

    setIsLoading(false);
  }, [addCourse, courseInfo, router, userDetail.uid]);

  const onStart = useCallback(() => {
    const completedChapters = courseInfo.completedChapters[userDetail.uid] || [];

    router.push({
      pathname: '/chapterView',
      params: {
        chapterListString: JSON.stringify(courseInfo.chapters),
        courseId: courseInfo.courseId,
        chapterIndex: courseInfo.chapters.findIndex((chapter, index) => !completedChapters.includes(index)) || 0
      }
    });
  }, [courseInfo.chapters, courseInfo.completedChapters, courseInfo.courseId, router, userDetail.uid]);

  return (
    <View>
      <Image source={IMAGE_ASSETS[courseInfo.banner_image]} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.courseNameText}>{courseInfo.courseName}</Text>
        <View style={styles.courseChapters}>
          <Ionicons name="book-outline" size={20} color={'#000'} />

          <Text style={styles.courseChaptersText}>{courseInfo.chapters.length} Chapters</Text>
        </View>
        <Text style={styles.courseDescriptionTitle}>Description:</Text>
        <Text style={styles.courseDescriptionText}>{courseInfo.description}</Text>

        {isEnroll ? (
          <MainButton text="Enroll Now" isLoading={isLoading} onPress={onEnroll} />
        ) : (
          <MainButton text="Start Now" onPress={onStart} />
        )}
      </View>
      <SafeAreaView style={styles.arrowBackContainer}>
        <Header />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250
  },
  descriptionContainer: {
    padding: 20
  },
  courseNameText: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25
  },
  courseChapters: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 5,
    alignItems: 'center'
  },
  courseChaptersText: {
    fontSize: 18,
    fontFamily: FONTS.DEFAULT
  },
  courseDescriptionTitle: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 20,
    marginTop: 10
  },
  courseDescriptionText: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 18,
    marginTop: 10,
    color: COLORS.GRAY
  },
  arrowBackContainer: {
    position: 'absolute',
    paddingHorizontal: 10
  }
});
