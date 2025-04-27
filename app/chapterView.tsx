import {View, Text, StyleSheet, DimensionValue, ScrollView} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import CourseChapter from '@/types/CourseChapter';
import {COLORS, FONTS} from '@/contstants/Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainButton from '@/components/shared/mainButton';
import {arrayUnion, doc, setDoc} from 'firebase/firestore';
import {db} from '@/config/firebaseConfig';
import {useCourseListContext} from '@/context/courseListContext';
import Header from '@/components/shared/header';
import {useUserDetailContext} from '@/context/userDetailContext';

export default function ChapterView() {
  const {chapterListString, courseId, chapterIndex} = useLocalSearchParams();
  const chapterList: CourseChapter[] = JSON.parse(chapterListString as string);

  const router = useRouter();
  const {onReadChapter} = useCourseListContext();
  const {userDetail} = useUserDetailContext();

  const [currentChapter, setCurrentChapter] = useState<number>(+chapterIndex);

  const progressWidth: DimensionValue = useMemo(() => {
    return `${(currentChapter / chapterList.length) * 100}%` as DimensionValue;
  }, [chapterList.length, currentChapter]);

  const updateCourseInfo = useCallback(async () => {
    try {
      await setDoc(
        doc(db, 'courses', courseId as string),
        {
          completedChapters: {
            [userDetail.uid]: arrayUnion(currentChapter)
          }
        },
        {merge: true}
      );

      onReadChapter(courseId as string, currentChapter);
    } catch (e) {
      console.error(e);
    }
  }, [courseId, userDetail.uid, currentChapter, onReadChapter]);

  const onPressNext = useCallback(async () => {
    setCurrentChapter(state => state + 1);

    updateCourseInfo();
  }, [updateCourseInfo]);

  const onPressFinish = useCallback(async () => {
    router.back();

    updateCourseInfo();
  }, [router, updateCourseInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View>
          <Header />
          <View style={styles.progressBar}>
            <View style={[styles.filledProgressBar, {width: progressWidth}]} />
          </View>

          <Text style={styles.topic}>{chapterList[currentChapter].topic}</Text>

          <Text style={styles.explain}>{chapterList[currentChapter].explain}</Text>

          {chapterList[currentChapter].code && (
            <Text style={[styles.practical, styles.code]}>{chapterList[currentChapter].code}</Text>
          )}

          {chapterList[currentChapter].example && (
            <Text style={[styles.practical, styles.example]}>{chapterList[currentChapter].example}</Text>
          )}
        </View>

        {currentChapter + 1 === chapterList.length ? (
          <MainButton text={'Finish'} onPress={onPressFinish} />
        ) : (
          <MainButton text={'Next'} onPress={onPressNext} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingVertical: 10
  },
  innerContainer: {
    paddingHorizontal: 20,
    minHeight: '100%',
    justifyContent: 'space-between'
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
  topic: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 20,
    marginTop: 25
  },
  explain: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 20,
    marginTop: 7
  },
  practical: {
    padding: 15,
    borderRadius: 15,
    fontFamily: FONTS.DEFAULT,
    fontSize: 18,
    marginTop: 10
  },
  code: {
    backgroundColor: COLORS.BLACK,
    color: COLORS.WHITE
  },
  example: {
    backgroundColor: COLORS.BG_GRAY
  }
});
