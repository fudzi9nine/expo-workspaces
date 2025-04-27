import {StyleSheet} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '@/contstants/Styles';
import PROMPT from '@/contstants/Prompt';
import sendMessageToAI from '@/config/aiModel';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '@/config/firebaseConfig';
import {useRouter} from 'expo-router';
import Course from '@/types/Course';
import {useUserDetailContext} from '@/context/userDetailContext';
import {useCourseListContext} from '@/context/courseListContext';
import CreateTopicList from '@/components/addCourse/createTopicList';
import CreateCourse from '@/components/addCourse/createCourse';
import Header from '@/components/shared/header';

export default function AddCourse() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topicText, setTopicText] = useState<string>('');
  const [topicList, setTopicList] = useState<string[]>([]);
  const [selectedTopicList, setSelectedTopicList] = useState<string[]>([]);

  const {userDetail} = useUserDetailContext();
  const {addCourse} = useCourseListContext();
  const router = useRouter();

  const onChangeTopicText = useCallback((text: string) => {
    setTopicText(text);
  }, []);

  const selectTopic = useCallback((selectedTopic: string) => {
    setSelectedTopicList(state =>
      state.includes(selectedTopic) ? state.filter(topic => selectedTopic !== topic) : [...state, selectedTopic]
    );
  }, []);

  const clearTopics = useCallback(() => {
    setTopicList([]);
    setSelectedTopicList([]);
  }, []);

  const generateTopics = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(topicText + PROMPT.IDEA);

      const jsonString = response?.choices?.[0]?.message?.content?.replace(/^```json|```$/g, '').trim();
      const parsedResponse: string[] = JSON.parse(jsonString || '[]');

      setTopicList(parsedResponse);
      setSelectedTopicList([]);
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, [topicText]);

  const generateCourse = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await sendMessageToAI(selectedTopicList + PROMPT.COURSE);

      const jsonString = response?.choices?.[0]?.message?.content?.replace(/^```json|```$/g, '').trim();
      const parsedResponse: Omit<Course, 'createdOn' | 'createdBy'> = JSON.parse(jsonString || '');

      const courseId = Date.now().toString();

      const completedChapters = new Map<string, number[]>();
      completedChapters.set(userDetail.uid, []);

      const newCourse: Course = {
        ...parsedResponse,
        createdOn: new Date(),
        createdBy: userDetail.email,
        courseId,
        completedChapters: {
          [userDetail.uid]: []
        },
        enrolledUsers: [userDetail.uid]
      };

      await setDoc(doc(db, 'courses', courseId), newCourse);

      addCourse(newCourse);

      router.push('/(tabs)/home');
    } catch (e) {
      console.error(e);
    }

    setIsLoading(false);
  }, [addCourse, router, selectedTopicList, userDetail.email, userDetail.uid]);

  return (
    <SafeAreaView style={styles.container}>
      <Header style={styles.header} title="Create New Course" onGoBack={topicList.length ? clearTopics : router.back} />
      {!topicList.length && (
        <CreateTopicList
          isLoading={isLoading}
          topicText={topicText}
          onChangeTopicText={onChangeTopicText}
          generateTopics={generateTopics}
        />
      )}

      {!!topicList.length && (
        <CreateCourse
          isLoading={isLoading}
          topicList={topicList}
          selectedTopicList={selectedTopicList}
          selectTopic={selectTopic}
          generateCourse={generateCourse}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  header: {
    marginHorizontal: 25
  }
});
