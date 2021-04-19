import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, FlatList, SafeAreaView } from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import ThumbNail from '../components/ThumbNail';

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

    componentDidMount() {
        const { album } = this.props.route.params
        this.GetImages({ first: fetchAmount, assetType: 'Photos', groupName: album })
    }

    async TryGetImages(fetchParams) {
        if (!this.state.loadingMore) {
            this.setState({ loadingMore: true }, () => { this.GetImages(fetchParams) })
        }
    }

    async GetImages(fetchParams) {
        if (this.state.lastCursor) {
            fetchParams.after = this.state.lastCursor;
        }

        CameraRoll.getPhotos(fetchParams).then(
            r => this.AppendImages(r)
        )
    }

    AppendImages(data) {
        const images = data.edges;
        const nextState = {
            loadingMore: false,
        };

        if (!data.page_info.has_next_page) {
            nextState.noMoreImages = true;
        }

        if (images.length > 0) {
            nextState.lastCursor = data.page_info.end_cursor;
            nextState.images = this.state.images.concat(images);
            this.setState(nextState);
        }
    }

    OnEndReached() {
        if (!this.state.noMoreImages) {
            this.TryGetImages({ first: fetchAmount, assetType: 'Photos' });
        }
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
                    initialNumToRender={fetchAmount}
                    onEndReachedThreshold={250}
                    onEndReached={() => this.OnEndReached()}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.TryGetImages({ first: fetchAmount, assetType: 'Photos' })}
                    data={this.state.images}
                    renderItem={({ item }) => (
                        <ThumbNail item = {item} navigation = {this.props.navigation} />
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