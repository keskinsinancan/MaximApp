import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";


const ChooseImageScreen = ({ navigation }) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        GetPhotosFromRoll();
    }, []);

    const GetPhotosFromRoll = () => {
        console.log("called");
        CameraRoll.getPhotos({
            first: 20,
            assetType: "Photos",
            
        })
            .then(r => {
                setImages(r.edges);
            })
            .catch((err) => {
                console.log("Error loading images => --- " + err);
            });
    };

    const ImageOnPress = (i, uri) => {
        console.log("pressed");
        console.log(i);
        console.log(uri);
    }

    return (
        <View>
            <ScrollView>
                {images.map((p, i) => {
                    return (
                        <TouchableHighlight key={i} onPress = {() => ImageOnPress(i, p.node.image.uri) }>
                            <Image
                                key={i}
                                style={{
                                    width: 300,
                                    height: 100,
                                }}
                                source={{ uri: p.node.image.uri }}
                            />
                        </TouchableHighlight>

                    );
                })}
            </ScrollView>
        </View>
    );
}

export default ChooseImageScreen;

const styles = StyleSheet.create({
    preview: {
        width: 200,
        height: 200
    }
});