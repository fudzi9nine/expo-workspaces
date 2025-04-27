import {View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import MainButton from '../shared/mainButton';
import {COLORS, FONTS} from '@/contstants/Styles';

type Props = {
  isLoading: boolean;
  topicList: string[];
  selectedTopicList: string[];
  selectTopic: (topic: string) => void;
  generateCourse: () => void;
};

export default function CreateCourse({isLoading, topicList, selectedTopicList, selectTopic, generateCourse}: Props) {
  return (
    <View style={styles.topicsContainer}>
      <FlatList
        contentContainerStyle={styles.topicsInnerContainer}
        data={topicList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.topicsHeaderText}>Select all topics which you want to add in the course</Text>
        }
        renderItem={({item, index}) => (
          <Pressable key={index + item} onPress={() => selectTopic(item)}>
            <Text style={[styles.topicText, selectedTopicList.includes(item) && styles.selectedTopicText]}>{item}</Text>
          </Pressable>
        )}
      />

      <MainButton
        text="Generate Course"
        onPress={generateCourse}
        isLoading={isLoading}
        isDisabled={!selectedTopicList.length}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topicsContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  topicsHeaderText: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 20
  },
  topicsInnerContainer: {
    gap: 10,
    paddingBottom: 10
  },
  topicText: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 0.4,
    borderRadius: 99,
    borderColor: COLORS.PRIMARY,
    color: COLORS.PRIMARY
  },
  selectedTopicText: {
    backgroundColor: COLORS.PRIMARY,
    color: COLORS.WHITE
  }
});
