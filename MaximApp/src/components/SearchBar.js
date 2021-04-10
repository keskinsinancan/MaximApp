import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
    return (
        <View style={styles.backgroundStyle}>
            <Icon name="search" style={styles.iconStyle} />
            <TextInput
                autoCapitalize = "none"
                placeholder="Search Here"
                style={styles.inputStyle}
                value={term}
                onChangeText={onTermChange}
                onEndEditing = {onTermSubmit}
            />
        </View>
    );
}


export default SearchBar;

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#f0EEEE',
        height: 50,
        borderRadius: 5,
        flexDirection: 'row',
        marginTop: 10
    },

    inputStyle: {
        flex: 1,
        fontSize: 18
    },

    iconStyle: {
        fontSize: 35,
        alignSelf: "center",
        marginHorizontal: 15
    }
});