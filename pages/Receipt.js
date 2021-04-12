import React, { Component} from 'react';
import {View, Text, StyleSheet, ScrollView, } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { Menu, Divider, Provider, Caption, Button, Paragraph } from 'react-native-paper';
import call from 'react-native-phone-call';

export default class ReceiptScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 49.2111347,
                longitude: -123.1178681,
                latitudeDelta: 0.0008,
                longitudeDelta: 0.0008,
            },
            orderStatus: "Preparing Your Order",
            deliveryID: "No.897571943",
            deliveryMan: "Shin",
            untouchableDelivery: true,
            tablewareNeeded: true,
            dailArgs: {
                number: '9093900003', // String value with the number to call
                prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
            },
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
                        image={require('../images/cook.png')}/>
                </MapView>
                <View style={[styles.statusCard, {marginTop: 220}]}>
                    <Caption style = {styles.captionStyle}>Order Status</Caption>
                    <Text style = {styles.orderStatusStyle}>
                        {this.state.orderStatus}
                    </Text>
                </View>
                <View style = {[styles.infoCard]}>
                    <View>
                        <Caption style = {styles.captionStyle}>Details</Caption>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Delivery ID</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>
                                {this.props.route.params.result.deliveryID}
                            </Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Delivery Man</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>
                                {this.props.route.params.result.deliveryMan}
                            </Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Untouchable Delivery</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>
                                {this.props.route.params.result.untouchableDelivery? "Yes" : "No"}
                            </Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Tableware Needed</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>
                                {this.props.route.params.result.tablewareNeeded? "Yes" : "No"}
                            </Text>
                        </View>
                        <View style = {styles.infoRow}>
                            <Text style = {styles.infoMarginVertical}>Notes</Text>
                            <Text style = {[styles.infoMarginVertical, {fontWeight:'bold'}]}>
                                {this.props.route.params.result.note}
                            </Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <Button
                    labelStyle={{ fontSize: 24, marginLeft: 5}}
                    icon = "phone" 
                    mode="contained" 
                    style = {styles.button}
                    onPress = {() => {
                        console.log("number: ", this.props.route.params.result.phoneNumber)
                        this.setState(prevState => ({
                            dailArgs: {
                                ...prevState.dailArgs,
                                number: this.props.route.params.result.phoneNumber
                            }
                        }))
                        call(this.state.dailArgs).catch(console.error)
                    }}>
                        
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
    addressStyle: {
        fontSize:18, 
        marginLeft:10, 
        fontWeight: 'bold',
        marginTop: 10, 
        marginBottom: 10
    },
    captionStyle: {
        fontSize:16, 
        textAlign:'center',
        marginTop:20,
    },
    orderStatusStyle: {
        fontSize:22, 
        textAlign:'center',
        marginTop:40,
        fontWeight:'bold',
    },
    statusCard: {
        height: 200, 
        width: 340, 
        backgroundColor: 'white', 
        marginHorizontal:10,
        marginVertical:5,
        borderWidth:1, 
        borderColor:'gainsboro',
    },
    infoCard: {
        height: 310, 
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
        width:60,
        height:60,
        opacity:10,
        marginTop:600,
        position:'absolute',
        borderRadius:60,
        backgroundColor:'#ff5600',
    }
});