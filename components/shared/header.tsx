import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '@/contstants/Styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import {useRouter} from 'expo-router';

type Props = {
  title?: string;
  style?: StyleProp<ViewStyle>;
  onGoBack?: () => void;
};

export default function Header({title, style, onGoBack}: Props) {
  const router = useRouter();

  return (
    <View style={[styles.container, style]}>
      <Ionicons
        suppressHighlighting
        onPress={onGoBack || router.back}
        name="arrow-back"
        size={30}
        color={COLORS.BLACK}
      />

      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>

      <View style={styles.titleRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    flex: 1,
    fontFamily: FONTS.DEFAULT_BOLD,
    fontSize: 25,
    paddingHorizontal: 10,
    textAlign: 'center'
  },
  titleRight: {
    height: 30,
    width: 30
  }
});
