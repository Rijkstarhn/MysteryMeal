import React, { Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import {Picker} from '@react-native-picker/picker';
import { GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {createRestaurant, findRestaurant} from '../service/service';
import * as Permission from 'expo-permissions';

const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.001;

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
            markerRegion: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            locationPermission: 'unknown',
            position: 'unknown',
            inputVisible:true,
            priceRange: -1.0,
            locationRange: -1.0,
        }
    }

    getLocationPermission = async () => {
        let {status} = await Permission.askAsync(Permission.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationPermission: false
            })
        } else {
            this.setState({
                locationPermission: true
            })
        }
    }

    componentDidMount() {
        this.getLocationPermission();
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                region :{
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                markerRegion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                position,
            })
        }, error => console.log('getLocation Error:', JSON.stringify(error)))
    }

    onRegionChange = (region) => {
        this.setState({
            region,
        })
    }

    _buttonClick = () => {
        let distance = this.state.locationRange;
        let price = this.state.priceRange;
        if (distance === -1 || price === -1) {
            console.log("Please select your preference!")
            Alert.alert("Please select your preference!")
            return;
        }
        const {latitude, longitude} = this.state.region;
        let currentLocation = {latitude, longitude};
        findRestaurant(price, distance, currentLocation).then(result => {
            // console.log("result:", result);
            if (result === undefined) {
                Alert.alert("Sorry, no result! Change preference and try again!");
                return;
            }
            this.props.navigation.navigate('Thank You!', {result});
            this.props.navigation.navigate('Order Confirmation', {result});
            this.props.navigation.navigate('Result', {result});
            this.props.navigation.navigate('test');
        });
    }

    render() {
        return (
            <View style = {{flex:1}}>
                <MapView
                    region={this.state.region}
                    ref = { ref => this.mapView = ref }
                    onRegionChangeComplete={this.onRegionChange}
                    style = {styles.map}>
                    <Marker coordinate={{latitude: this.state.markerRegion.latitude, longitude: this.state.markerRegion.longitude}} />
                </MapView>
                <GooglePlacesAutocomplete
                    styles={{
                        container: styles.searchBar
                    }}
                    placeholder='Search Your Address'
                    enableHighAccuracyLocation = {true}
                    disableScroll = {true}
                    enablePoweredByContainer = {false}
                    textInputProps={{
                        onFocus: () => this.setState({
                            inputVisible: false
                        }),
                    }}
                    onPress={(data, details = null) => {
                        // console.log("****************************************************")
                        // console.log("details", details);
                        this.setState({
                            inputVisible: true,
                            region :{
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            },
                            markerRegion :{
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
                {this.state.inputVisible && 
                <View style={[styles.inputStyle, {marginTop: 180}]}>
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
                }
                {this.state.inputVisible && 
                <View style={[styles.inputStyle, {marginTop: 250}]}>
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
                }
                <TouchableOpacity 
                    style = {styles.button}
                    onPress = {() => {
                        this._buttonClick(); 
                        // this.props.navigation.navigate('Result');
                        // createRestaurant();
                    }}>
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
    searchBar: {
        width: '94%',
        marginBottom: 30,
        marginTop: 60,
        marginHorizontal:10,
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
        height: 40,
    },
    pickerStyle: {
        height: 40,
        width: 300,
        color: 'black',
    },
  });