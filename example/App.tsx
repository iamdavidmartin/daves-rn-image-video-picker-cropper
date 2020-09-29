import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import Picker from 'daves-rn-image-video-picker-cropper';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.full}>
        <Picker
          nextTitle="hello, world!"
          backgroundColor="#ccc"
          maxScale={4}
          multipleSelect={true}
          multipleSelectMaxItems={4}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
  },
});

export default App;
