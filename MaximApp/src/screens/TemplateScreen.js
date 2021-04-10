import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class TemplateScreen extends Component{
  render(){
    console.log(this.props);
    return(
      <View>
        <Text>TemplateScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});