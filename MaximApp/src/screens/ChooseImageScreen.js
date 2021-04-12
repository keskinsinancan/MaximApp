import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChooseImageScreen = () => {
    return (
        <View>
            <Image
                source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                style={styles.preview}
            />
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