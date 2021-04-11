import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({navigation}) => {
    const CameraIconOnPress = () => {
        navigation.navigate ("Camera");
    }
    
    
    const ImportIconOnPress = () => {
        navigation.navigate ("ChooseImage");
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={CameraIconOnPress} style={styles.touchableHighlight} >
                <Icon name="camera" style={styles.icon} />
            </TouchableHighlight>

            <TouchableHighlight onPress={ImportIconOnPress} style={styles.touchableHighlight}>
                <Icon name="image" style={styles.icon} />
            </TouchableHighlight>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },

    openCamera: {

    },

    importImage: {

    },

    icon: {
        fontSize: 60,
        alignSelf: "center",
        margin: 10,
    },

    touchableHighlight: {
        backgroundColor: '#c0c0c0',
        borderColor : '#000000',
        borderWidth : 1,
        borderRadius : 5,
        margin : 5
    }
});