import React, { useState, useEffect, Component } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableHighlight, Text } from 'react-native';
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
            path : uri
          });
    }

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.images.map((p, i) => {
                        return (
                            <TouchableHighlight key={i} onPress={() => this.ImageOnPress(p.node.image.uri)}>
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
}

export default ChooseImageScreen;


const styles = StyleSheet.create({
    preview: {
        width: 200,
        height: 200
    },

    container : {

    }
});