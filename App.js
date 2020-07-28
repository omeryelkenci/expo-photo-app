import React from 'react';
import {Alert} from 'react-native-web';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import logo from './assets/icon.png';

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({localUri: pickerResult.uri});
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Uh oh, sharing isn't available on your platform.");
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: selectedImage.localUri}}
          style={styles.thumbnail}
        ></Image>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.buttonContainerButton1}
          >
            <Text style={styles.buttonText}>Pick a photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openShareDialogAsync}
            style={styles.buttonContainerButton2}
          >
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'http://www.ebts.co.in/wp-content/uploads/2014/05/gallery-banner.jpg',
        }}
        style={styles.logo}
        style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width/2}}
      ></Image>
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a hoto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 15,
    margin: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: Dimensions.get('window').width,
    height: 100,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumbnail: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
	marginTop: 30
  },
  buttonContainer: {
    flex: 1,
	flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
	bottom: 0,
    height: 100,
  },
  buttonContainerButton1: {
	width: Dimensions.get('window').width / 2,
    backgroundColor: 'blue',
	padding: 15,
  },
  buttonContainerButton2: {
	width: Dimensions.get('window').width / 2,
    backgroundColor: 'green',
	padding: 15,
  },
});
