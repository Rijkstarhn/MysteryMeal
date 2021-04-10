import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';
import { Button, Paragraph, Dialog } from 'react-native-paper';

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

export default class ResultScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            deliveryTime: "12:30 p.m.",
            foodDescription: "This is a brillant spanish dish",
        }
    }

    hideDialog = () => {
        this.setState({
            visible: false,
        })
    }

    tryAgain = () => {
        this.props.navigation.navigate('Mystery Meal')
    }

    confirm = () => {
        this.props.navigation.navigate('Order Confirmation')
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
                <Dialog
                    style={styles.dialogContainer} 
                    visible={this.state.visible} 
                    onDismiss={this.hideDialog}>
                    <Dialog.Title>Meal Name</Dialog.Title>
                    <Dialog.Content>
                        <Image style={styles.img} 
                        source={{
                            uri: "https://scontent.fcxh3-1.fna.fbcdn.net/v/t1.6435-9/40922911_2005368526194385_1989863953169121280_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=973b4a&_nc_ohc=VbYlvpdyhNMAX9139us&_nc_ht=scontent.fcxh3-1.fna&oh=3c784849b7086abed1bb80358e84d134&oe=60949542"
                        }}>
                        </Image>
                        <Paragraph style={{fontSize:20, fontWeight:'bold', marginTop:20}}>
                            $25
                        </Paragraph>
                        <Paragraph style={{fontSize:12, fontWeight:'bold', marginTop:10}}>
                            Delivery Time: {this.state.deliveryTime}
                        </Paragraph>
                        <Paragraph style={{fontSize:12, fontWeight:'bold', marginTop:10}}>
                            {this.state.foodDescription}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style = {{marginLeft: 30}}>
                        <Button onPress={() => this.tryAgain()}>Try Again</Button>
                        <Button onPress={() => this.confirm()}>Confirm</Button>
                    </Dialog.Actions>
                </Dialog>
                
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
    dialogContainer: { 
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 600,
        position: 'absolute',
        zIndex: 99
    },
    img: {
        width: 220,
        height: 200,
        marginBottom: 20,
        marginTop: 20,
    },
  });