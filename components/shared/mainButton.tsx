import {ActivityIndicator, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '@/contstants/Styles';

type Props = {
  text: string;
  type?: 'fill' | 'outline';
  isLoading?: boolean;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function MainButton({text, type = 'fill', isLoading, isDisabled, style, onPress}: Props) {
  const isOutlineButton = type === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || isDisabled}
      style={[
        styles.container,
        style,
        isOutlineButton && styles.outlineContainer,
        isDisabled && styles.disabledContainer
      ]}>
      {!!isLoading ? (
        <ActivityIndicator size="small" color={isOutlineButton ? COLORS.PRIMARY : COLORS.WHITE} />
      ) : (
        <Text style={[styles.text, isOutlineButton && styles.outlineText, isDisabled && styles.disabledText]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY
  },
  outlineContainer: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    backgroundColor: COLORS.WHITE
  },
  disabledContainer: {
    backgroundColor: COLORS.BG_GRAY,
    borderColor: COLORS.BG_GRAY
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: FONTS.DEFAULT,
    color: COLORS.WHITE
  },
  outlineText: {
    color: COLORS.PRIMARY
  },
  disabledText: {
    color: COLORS.GRAY
  }
});
