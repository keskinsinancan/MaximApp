import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const ImageScreen = ({ navigation, route }) => {
    const { path } = route.params;
    const[image, setImage] = useState(path);
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                style={styles.preview}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity style={styles.capture}>
                    <Icon name="save" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.capture}>
                    <Icon name="crop" style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.capture} onPress = {() =>  navigation.goBack()} >
                    <Icon name="camera" style={styles.icon} />
                </TouchableOpacity>
            </View>

        </View>
    );
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