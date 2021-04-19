import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, TouchableHighlightComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    CameraIconOnPress() {
        this.props.navigation.navigate("Camera"); //navigates to the camera screen
    }

    ImportIconOnPress() {
        this.props.navigation.navigate("ChooseImage", {
            album: "" //when parameter is null, ChooseImageScreen loads all images from the roll
        });
    }

    MaximLibOnPress() {
        this.props.navigation.navigate("ChooseImage", {
            album: "MaximApp" //parameter to load only editted images before
        });
    }
    render() {
        return (
            <View style={styles.container} >
                <TouchableHighlight onPress={() => this.CameraIconOnPress()} style={styles.touchableHighlight} >
                    <IconWithText iconName="camera" text="Camera" />
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.ImportIconOnPress()} style={styles.touchableHighlight}>
                    <IconWithText iconName="image" text="Gallery" />
                </TouchableHighlight>

                <TouchableHighlight onPress={() => this.MaximLibOnPress()} style={styles.touchableHighlight}>
                    <IconWithText iconName="save" iconStyle={styles.icon} text="Maxim Lib" textStyle={styles.textStyle} />
                </TouchableHighlight>
            </View>
        );
    }
}

//returns a JSC element with icon and text for the main menu, 
//gets a icon name param 
function IconWithText(props) {
    return (
        <View>
            <Icon name={props.iconName} style={styles.icon} />
            <Text style={styles.textStyle}>{props.text}</Text>
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
    icon: {
        fontSize: 60,
        alignSelf: "center",
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10
    },

    touchableHighlight: {
        backgroundColor: '#c0c0c0',
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    textStyle: {
        alignSelf: "center"
    }
});