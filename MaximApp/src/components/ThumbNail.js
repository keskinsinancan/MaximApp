import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight} from 'react-native';

//handles press gesture of the image
const ImageOnPress = (uri, navigation) => {
    navigation.navigate("Image", {
        path: uri
    });
}

//get a item parameter which includes the image info such as url
//navigates to the image editting screen with the navigation prop
const ThumbNail = ({ navigation, item }) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => ImageOnPress(item.node.image.uri, navigation)}>
                <Image
                    style={styles.thumbnail}
                    source={{ uri: item.node.image.uri }}
                />
            </TouchableHighlight>
        </View>
    );
}

export default ThumbNail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    },

    thumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});
