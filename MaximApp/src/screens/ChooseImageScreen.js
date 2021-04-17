import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, SafeAreaView, Text } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

export class ChooseImageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            lastCursor: null,
            noMorePhotos: false,
            loadingMore: false,
        };
    }

    componentDidMount() {
        this.LoadImages();
    }

    LoadImages() {
        const fetchParams = {
            first: 25,
            groupTypes: 'SavedPhotos',
            assetType: 'Photos',
        };

        CameraRoll.getPhotos(fetchParams)
            .then(r => {
                this.setState(previousState => ({
                    images: previousState.images.concat(r.edges)
                }))
            })
            .catch((err) => {
                console.log("Error loading images => --- " + err);
            });
    }

    ImageOnPress(uri) {
        this.props.navigation.navigate("Image", {
            path: uri
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.images}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 1
                            }}>
                            <TouchableHighlight onPress = {() => this.ImageOnPress(item.node.image.uri)}>
                                <Image
                                    style={styles.imageThumbnail}
                                    source={{ uri: item.node.image.uri }}
                                />
                            </TouchableHighlight>
                        </View>
                    )}
                    numColumns={3}
                    keyExtractor={(item) => item.node.image.uri}
                />
            </SafeAreaView>
        );
    }
}

export default ChooseImageScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
});