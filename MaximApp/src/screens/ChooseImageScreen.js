import React, { PureComponent } from 'react';
import {StyleSheet, Image, TouchableHighlight, FlatList, SafeAreaView } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import ThumbNail from '../components/ThumbNail';

/**
 * @export
 * @class ChooseImageScreen
 * @extends {PureComponent}
 * Gets the images from the roll 
 * Loads 50 images per page
 */

//sets the number of photos to retrieve from the local storage per page
const fetchAmount = 50;

export class ChooseImageScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            lastCursor: null,
            noMoreImages: false,
            loadingMore: false,
            refreshing: false,
        };

    }

    //gets first chunk of photos when the component is loaded
    componentDidMount() {
        const { album } = this.props.route.params; //selects the album
        this.GetImages({ first: fetchAmount, assetType: 'Photos', groupName: album })
    }

    //Gets next page of images if end is not reached, checks loadingmore state to operate
    async TryGetImages(fetchParams) {
        if (!this.state.loadingMore) {
            this.setState({ loadingMore: true }, () => { this.GetImages(fetchParams) })
        }
    }

    //gets a chunk of images from roll according to the parameters 
    async GetImages(fetchParams) {
        if (this.state.lastCursor) {
            fetchParams.after = this.state.lastCursor;
        }

        CameraRoll.getPhotos(fetchParams).then(
            r => this.AppendImages(r)
        )
    }

    //appends the new images from to roll to the existing list of images
    //updates the state 
    AppendImages(data) {
        const images = data.edges;
        const nextState = {
            loadingMore: false,
        };

        //checks the chunk if it has a next page
        if (!data.page_info.has_next_page) {
            nextState.noMoreImages = true;
        }

        if (images.length > 0) {
            nextState.lastCursor = data.page_info.end_cursor;
            nextState.images = this.state.images.concat(images);
            this.setState(nextState);
        }
    }

    //flatlist triggers this method when user reaches to the end of the list
    OnEndReached() {
        if (!this.state.noMoreImages) {
            this.TryGetImages({ first: fetchAmount, assetType: 'Photos' });
        }
    }

    //navigates to the image editting screen when pressed to the image
    ImageOnPress(uri) {
        this.props.navigation.navigate("Image", {
            path: uri
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    initialNumToRender={fetchAmount}
                    onEndReachedThreshold={250}
                    onEndReached={() => this.OnEndReached()}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.TryGetImages({ first: fetchAmount, assetType: 'Photos' })}
                    data={this.state.images}
                    renderItem={({ item }) => (
                        <ThumbNail item={item} navigation={this.props.navigation} />
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index}
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