import React, { Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class ReceiptScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Receipt</Text>
                
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });