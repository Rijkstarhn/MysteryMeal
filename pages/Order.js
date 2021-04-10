import React, { Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Menu, Divider, Provider, Caption } from 'react-native-paper';

export default class OrderScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 49.2111347,
                longitude: -123.1178681,
                latitudeDelta: 0.0008,
                longitudeDelta: 0.0008,
            },
            visible: true,
        }
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <MapView
                    pitchEnabled={false} 
                    rotateEnabled={false} 
                    zoomEnabled={false} 
                    scrollEnabled={false}
                    initialRegion={this.state.region}
                    style={styles.map}>
                    <Marker 
                        coordinate={{latitude: this.state.region.latitude, longitude: this.state.region.longitude}}
                        image={require('../images/gift.png')}/>
                </MapView>
                
                <View style = {styles.addressCard}>

                    <View style = {{borderBottomColor: 'black', borderBottomWidth: 1,}}>
                        <Caption>Merchant Address</Caption>
                    </View>
                    
                </View>
                <View style = {styles.addressCard}>

                    <View style = {{borderBottomColor: 'black', borderBottomWidth: 1,}}>
                        <Caption>Merchant Address</Caption>
                    </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        width: 340,
        height: 200,
        marginHorizontal:10,
        marginVertical:10,
    },
    addressCard: {
        height: 460, 
        width: 340, 
        backgroundColor: 'white', 
        marginTop:220, 
        marginHorizontal:10,
        marginVertical:5,
        borderWidth:1, 
        borderColor:'gainsboro',
    }
});