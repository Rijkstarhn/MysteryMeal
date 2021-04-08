import React, { Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Button title = "Go to Receipt" 
                    onPress = {() => this.props.navigation.navigate('Receipt')}>
                </Button>
                <Button title = "Go to Order" 
                    onPress = {() => this.props.navigation.navigate('Order')}>
                </Button>
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