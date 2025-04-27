import {COLORS} from '@/contstants/Styles';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

export default function Loader() {
  return <ActivityIndicator size="large" color={COLORS.PRIMARY} style={styles.loader} />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  }
});
