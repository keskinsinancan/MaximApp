
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CameraScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cameraType: "front",
      mirrorMode: false
    }
  }

  SwithCameraOnPress() {
    if (this.state.cameraType === 'back') {
      this.setState({
        cameraType: 'front',
        mirror: true
      });
    } else {
      this.setState({
        cameraType: 'back',
        mirror: false
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          mirrorMode={this.state.mirrorMode}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />

        <View style={styles.menu}>
          <TouchableOpacity style={styles.capture} onPress={() => this.props.navigation.navigate("ChooseImage")} >
            <Icon name="image" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={this.TakePicture.bind(this)} >
            <Icon name="camera" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={() => this.SwithCameraOnPress()}>
            <Icon name="switch-camera" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async TakePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.props.navigation.navigate("Image", {
        path: data.uri
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menu: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});