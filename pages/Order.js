import React, { Component} from 'react';
import {View, Text, StyleSheet, ScrollView, } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Menu, Divider, Provider, Caption, Button, Paragraph } from 'react-native-paper';

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
            address:"Marine Gateway, 458 SW Marine Dr, Vancouver, BC V5X 0C4",
            phoneNumber:"+16044288813",
            time:"12:30 PM",
            paymentMethod: "Wechat",
            foodPrice: "12.98",
            multiFee: "3.99",
            tips: "0.00",
            total: "16.97",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
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
                <View style = {[styles.infoCard, {marginTop: 220}]}>
                    <View>
                        <Caption style = {{fontSize:14, marginLeft:10, marginTop:10}}>Merchant Address</Caption>
                        <Paragraph style = {{fontSize:18, marginLeft:10, fontWeight: 'bold',marginTop: 10, marginBottom: 10}}>
                            {this.state.address}
                        </Paragraph>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Phone Number</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{this.state.phoneNumber}</Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {{marginTop: 12, marginBottom: 12}}>Time</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{this.state.time}</Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {{marginTop: 12, marginBottom: 12}}>Payment Method</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{this.state.paymentMethod}</Text>
                        </View>
                    </View>
                </View>
                <View style = {[styles.infoCard]}>
                    <View>
                        <Caption style = {{fontSize:14, marginLeft:10, marginTop:10}}>Fees</Caption>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Food Price</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{`$ ${this.state.foodPrice}`}</Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {{marginTop: 12, marginBottom: 12}}>GST/HST & Service Fee</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{`$ ${this.state.multiFee}`}</Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {{marginTop: 12, marginBottom: 12}}>Tips</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{`$ ${this.state.tips}`}</Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {{marginTop: 12, marginBottom: 12}}></Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>{`Total  $ ${this.state.total}`}</Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <Button 
                    mode="contained" 
                    style = {styles.button}
                    onPress = {() => {this.props.navigation.navigate('Receipt')}}>
                    {`Place Order         $${this.state.total}`}
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
    infoCard: {
        height: 260, 
        width: 340, 
        backgroundColor: 'white', 
        marginHorizontal:10,
        marginVertical:5,
        borderWidth:1, 
        borderColor:'gainsboro',
    },
    infoRow: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        borderTopColor: '#bbb6b6', 
        borderTopWidth: 1, 
        marginTop:5, 
        width: 320, 
        marginLeft:5, 
        marginRight:5,
    },
    infoMarginVertical: {
        marginTop: 12, 
        marginBottom: 12
    },
    button: {
        width:340,
        height:40,
        marginTop:600,
        marginHorizontal:10,
        position:'absolute',
        borderRadius:20,
        backgroundColor:'#ff5600',
    }
});