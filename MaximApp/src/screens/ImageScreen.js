import React, { Component } from 'react';
import { View, Alert, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraRoll from "@react-native-community/cameraroll";
import ImagePicker from 'react-native-image-crop-picker';

/**
 *
 *
 * @export
 * @class ImageScreen
 * @extends {Component}
 * Image editting screen
 * User can crop and save the image
 */
export class ImageScreen extends Component {
    constructor(props) {
        super(props);
        const { path } = this.props.route.params;
        this.state = {
            image: path,
            originalImage: null,
            isImageCropped: false
        }
    }

    //checks the write permission of the app 
    async HasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === "granted";
    }

    //handles the press event for save button
    async SaveImageOnPress() {
        //if image is not cropped, that means image is not shaped properly (240x180), to allow the save operation, user has to crop the image
        if (this.state.isImageCropped) {
            try {
                if (Platform.OS === "android" && !(await this.HasAndroidPermission())) {
                    return;
                }

                //saves the cropped image to the MaximApp Album
                CameraRoll.save(this.state.image, { type: 'photo', album: 'MaximApp' });
                { await CustomAlert("Success", "Image is saved to the gallery.") }
            }
            catch (error) {
                { await CustomAlert("Error", "Error saving image!") }
            }
        }
        else {
            {
                await CustomAlert("Warning", "Please Crop the Image Before Saving")
            }

        }
    }

    //Opens the cropper for editting, croppes is used from the package named "react-native-image-crop-picker"
    async OpenCropperOnPress() {
        const imageToEdit = this.state.originalImage != null ? this.state.originalImage : this.state.image;
        //opens the cropper acorring to the parameters
        //updates the state after cropping
        ImagePicker.openCropper({
            path: imageToEdit,
            enableRotationGesture: false,
            hideBottomControls: true,
            width: 180,
            height: 240,
            compressImageMaxHeight: 240,
            compressImageMaxWidth: 180
        }).then(image => {
            this.setState(previousState => ({
                image: image.path,
                originalImage: previousState.image,
                isImageCropped: true
            }))
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.image }}
                    style={styles.preview}
                />
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.capture} onPress={() => this.SaveImageOnPress()} >
                        <Icon name="save" style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.capture} onPress={() => this.OpenCropperOnPress()}>
                        <Icon name="crop" style={styles.icon} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

//returns an alert jsx element with the title and message
async function CustomAlert(title, message) {
    const alert = Alert.alert(
        title,
        message,
        [
            { text: "OK" }
        ]
    );
    return alert;
}

export default ImageScreen;

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
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },

    icon: {
        fontSize: 25
    },

    menu: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});