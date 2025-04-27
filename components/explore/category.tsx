import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FONTS} from '@/contstants/Styles';
import {collection, getDocs, orderBy, query, where} from 'firebase/firestore';
import {db} from '@/config/firebaseConfig';
import Course from '@/types/Course';
import CourseItem from '../shared/courseItem';

type Props = {
  category: string;
};

export default function Category({category}: Props) {
  const [courseList, setCourseList] = useState<Course[]>([]);

  const getCoursesByCategory = useCallback(async () => {
    try {
      const q = query(collection(db, 'courses'), where('category', '==', category), orderBy('createdOn', 'desc'));
      const querySnapshot = await getDocs(q);
      const newCourseList: Course[] = [];

      querySnapshot.forEach(doc => {
        newCourseList.push(doc.data() as Course);
      });

      setCourseList(newCourseList);
    } catch (e) {
      console.log(e);
    }
  }, [category]);

  useEffect(() => {
    getCoursesByCategory();
  }, [getCoursesByCategory]);

  if (!courseList.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <FlatList
        horizontal
        data={courseList}
        renderItem={({item}) => <CourseItem course={item} width={300} />}
        keyExtractor={item => item.courseId}
        contentContainerStyle={styles.innerContainer}
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
    fontSize: 20
  },
  innerContainer: {
    marginTop: 6,
    gap: 7
  }
});
