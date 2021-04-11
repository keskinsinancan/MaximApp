import React, { Component } from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SearchBar from '../components/SearchBar';

const SearchScreen = () => {
    const [term, setTerm] = useState("");
    return (
        <View>
            <SearchBar
                term = {term}
                onTermChange = {setTerm}
                onTermSubmit = {() => console.log("term was submitted")}
            />
            <Text>{term}</Text>
        </View>
    );
}

export default SearchScreen;

const styles = StyleSheet.create({

});


// onTermChange = {(newTerm) => setTerm(newTerm)}