import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Text} from 'react-native';

import Picker from 'daves-rn-image-video-picker-cropper';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.full}>
        <Picker nextTitle="hello, world!" />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  full: {},
});

export default App;
