import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Course from '@/types/Course';
import Ionicons from '@expo/vector-icons/Ionicons';
import {COLORS} from '@/contstants/Styles';
import {useRouter} from 'expo-router';
import {useUserDetailContext} from '@/context/userDetailContext';

type Props = {
  courseInfo: Course;
};

export default function Chapters({courseInfo}: Props) {
  const router = useRouter();

  const {userDetail} = useUserDetailContext();

  const completedChapters = courseInfo.completedChapters[userDetail.uid] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters</Text>

      {courseInfo.chapters.map((chapter, index) => (
        <TouchableOpacity
          style={styles.chapterContainer}
          key={index + chapter.topic}
          onPress={() =>
            router.push({
              pathname: '/chapterView',
              params: {
                chapterListString: JSON.stringify(courseInfo.chapters),
                courseId: courseInfo.courseId,
                chapterIndex: index
              }
            })
          }>
          <View style={styles.chapterTextContainer}>
            <Text style={styles.chapterText}>{index + 1}</Text>
            <Text style={styles.chapterText}>{chapter.topic}</Text>
          </View>
          {completedChapters.includes(index) ? (
            <Ionicons name="checkmark-circle" size={24} color={COLORS.PRIMARY} />
          ) : (
            <Ionicons name="play" size={24} color={COLORS.PRIMARY} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontFamily: 'outfitBold',
    fontSize: 25
  },
  chapterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    marginTop: 10
  },
  chapterTextContainer: {
    flexDirection: 'row',
    flex: 1,
    gap: 10
  },
  chapterText: {
    fontFamily: 'outfit',
    flexShrink: 1,
    fontSize: 20
  }
});
