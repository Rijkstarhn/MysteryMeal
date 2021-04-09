import React, { Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Picker} from '@react-native-picker/picker';
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            region :{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            selectedRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            priceRange: -1.0,
            locationRange: -1.0,
        }
    }

    onRegionChange = (region) => {
        this.setState({
            region,
        })
    }

    _buttonClick = () => {
        console.log('location:', this.state.locationRange);
        console.log('price:', this.state.priceRange);
    }

    // jumpToLocation = () => {
    //     console.log("jumpToGPS");
    //     navigator.geolocation.getCurrentPosition(() => {
    //         console.log('jumpToLocation', this.state.region);
    //         this.mapView.animateToRegion(this.state.region, 2000);
    //     }, error => alert(JSON.stringify(error)));
    // }

    render() {
        return (
            <View style = {{flex:1}}>
                <MapView
                    region={this.state.region}
                    ref = { ref => this.mapView = ref }
                    onRegionChangeComplete={this.onRegionChange}
                    style = {styles.map}
                >
                    <Marker coordinate={{latitude: this.state.selectedRegion.latitude, longitude: this.state.selectedRegion.longitude}} />
                </MapView>
                <GooglePlacesAutocomplete
                    placeholder='Search Your Address'
                    enableHighAccuracyLocation = {true}
                    disableScroll = {true}
                    enablePoweredByContainer = {false}
                    multiline = {true}
                    numberOfLines = {3}
                    onPress={(data, details = null) => {
                        // console.log("****************************************************")
                        // console.log("details", details.geometry.location);
                        this.setState({
                            region :{
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            },
                            selectedRegion :{
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }
                        });
                    }}
                    onFail={(error) => console.error(error)}
                    query={{
                        key: 'AIzaSyCuoPO7uy66MhfpMkOC6tMewzxF9ElnXZo',
                        language: 'en',
                    }}
                    fetchDetails={true}
                    currentLocation={true}
                    currentLocationLabel='Current location'
                />
                <View style={[styles.inputStyle, {marginTop: 100}]}>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.locationRange}
                        onValueChange={(itemValue, itemIndex) =>
                            {this.setState({
                                locationRange: itemValue,
                            })
                        }
                        }>
                        <Picker.Item label="Select Distance" value="-1.0" />
                        <Picker.Item label="0.5km" value="0.5" />
                        <Picker.Item label="1km" value="1.0" />
                        <Picker.Item label="2km" value="2.0" />
                        <Picker.Item label="3km" value="3.0" />
                        <Picker.Item label="5km" value="5.0" />
                        <Picker.Item label="10km" value="10.0" />
                    </Picker>
                </View>
                <View style={[styles.inputStyle, {marginTop: 180}]}>
                    <Picker
                        style={styles.pickerStyle}
                        selectedValue={this.state.priceRange}
                        onValueChange={(itemValue, itemIndex) =>
                            {this.setState({
                                priceRange: itemValue,
                            })
                        }
                        }>
                        <Picker.Item label="Select Price" value="-1.0" />
                        <Picker.Item label="< $12" value="1.0" />
                        <Picker.Item label="$12 ~ $18" value="2.0" />
                        <Picker.Item label="$18 ~ $25" value="3.0" />
                        <Picker.Item label="Try something Luxury" value="4.0" />
                    </Picker>
                </View>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => this._buttonClick()}>
                    <Text style={styles.buttonText}>Surprise</Text>
                </TouchableOpacity>
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