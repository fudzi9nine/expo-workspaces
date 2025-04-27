import {FlatList, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import HomeHeader from '@/components/(tabs)/home/homeHeader';
import {COLORS, FONTS} from '@/contstants/Styles';
import NoCourseView from '@/components/(tabs)/home/noCourseView';
import CourseProgressList from '@/components/(tabs)/home/courseProgressList';
import {useCourseListContext} from '@/context/courseListContext';
import {useRouter} from 'expo-router';
import MainButton from '@/components/shared/mainButton';
import CourseItem from '@/components/shared/courseItem';

export default function Home() {
  const router = useRouter();
  const {courseList} = useCourseListContext();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <FlatList
        data={courseList}
        ListHeaderComponent={
          <>
            <HomeHeader />
            {!!courseList.length && (
              <>
                <CourseProgressList courseList={courseList} />
                <Text style={styles.title}>Courses</Text>
                <MainButton text="Add New Course" type="outline" onPress={() => router.push('/addCourse')} />
              </>
            )}
          </>
        }
        keyExtractor={item => item.courseId}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<NoCourseView />}
        renderItem={({item}) => <CourseItem course={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  listContainer: {
    gap: 10,
    marginTop: 6,
    paddingHorizontal: 25,
    paddingBottom: 10
  },
  title: {
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25,
    paddingTop: 15
  }
});
