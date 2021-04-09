import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

export default class ResultScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <MapView
                    initialRegion={{
                    latitude: 49.2111347,
                    longitude: -123.1178681,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                    style={styles.map}
                />
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    pickerStyle: {
        position: "absolute",
        backgroundColor: 'white',
        marginVertical: 280,
        marginHorizontal: 120,
        height: 30,
        width: 220,
    },
    button: {           
        position: "absolute",
        backgroundColor: '#FFCC00', 
        marginVertical: 480,
        marginHorizontal: 120,
        borderWidth: 0,
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    buttonText: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '35%',
        marginBottom: '35%'
    },
    input: {
        height: 50,
        margin: 20,
        top:40,
        borderWidth: 0,
        backgroundColor:'white',
      },
    inputStyle: {
        position: "absolute",
        borderColor: 'gainsboro',
        backgroundColor: 'white',
        borderWidth: 1,
        marginLeft: 30,
        width: 300,
        height: 50,
    },
    pickerStyle: {
        height: 50,
        width: 300,
        color: 'black',
    },
  });