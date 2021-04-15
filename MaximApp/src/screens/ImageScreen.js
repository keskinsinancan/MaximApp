import React, { useState, Component } from 'react';
import { View, Alert, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraRoll from "@react-native-community/cameraroll";

export class ImageScreen extends Component {
    constructor(props) {
        super(props);
        const { path } = this.props.route.params;
        this.state = {
            image: path
        }
    }

    async HasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(permission);
        return status === "granted";
    }

    async SaveImageOnPress() {
        try {
            if (Platform.OS === "android" && !(await this.HasAndroidPermission())) {
                return;
            }

            CameraRoll.save(this.state.image, { type: 'photo' });
            Alert.alert(
                "Success",
                "Image is saved to the gallery.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        catch (error) {
            Alert.alert(
                "Error",
                "Error saving image",
                [
                    {
                        text: "OK",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                ]
            );
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: this.state.image }}
                    style={styles.preview}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.capture}>
                        <Icon name="save" style={styles.icon} onPress={() => this.SaveImageOnPress()} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.capture}>
                        <Icon name="crop" style={styles.icon} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.capture} onPress={() => navigation.goBack()} >
                        <Icon name="camera" style={styles.icon} />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

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
        fontSize: 30
    }
});