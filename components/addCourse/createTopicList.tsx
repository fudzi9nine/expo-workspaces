import {Text, TextInput, StyleSheet, View} from 'react-native';
import React from 'react';
import MainButton from '../shared/mainButton';
import {COLORS, FONTS} from '@/contstants/Styles';

type Props = {
  isLoading: boolean;
  topicText: string;
  onChangeTopicText: (text: string) => void;
  generateTopics: () => void;
};

export default function CreateTopicList({isLoading, topicText, onChangeTopicText, generateTopics}: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>What do you want to learn today?</Text>
        <Text style={styles.subtitle}>
          What course do you want to create? [ex. Learn Python, Digital Marketing, etc...]
        </Text>

        <TextInput
          onChangeText={onChangeTopicText}
          value={topicText}
          style={styles.input}
          numberOfLines={3}
          multiline
          placeholder="(ex. Learn Java, Learn Data Science)"
        />
      </View>

      <MainButton
        text="Generate Topics"
        type="outline"
        isLoading={isLoading}
        isDisabled={!topicText}
        onPress={generateTopics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: FONTS.DEFAULT,
    fontSize: 20,
    marginBottom: 10,
    color: COLORS.GRAY
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 16,
    height: 100,
    marginTop: 10,
    textAlignVertical: 'top',
    fontSize: 18
  }
});
