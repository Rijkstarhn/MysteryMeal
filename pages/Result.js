import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';
import { Button, Paragraph, Dialog } from 'react-native-paper';
import {findRestaurant} from '../service/service';

const LATITUDE_DELTA = 0.05;
const LONGITUDE_DELTA = 0.05;

export default class ResultScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            deliveryTime: "Time calculating...",
            foodDescription: "This is food description",
        }
    }

    // componentDidMount() {
    //     console.log('state', this.props.navigation.state);
    // }

    hideDialog = () => {
        this.setState({
            visible: false,
        })
    }

    tryAgain = () => {
        this.props.navigation.navigate('Mystery Meal')
    }

    confirm = () => {
        this.props.navigation.navigate('Order Confirmation');
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
                    <Dialog.Title>
                        {this.props.route.params.result.mealName}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Image style={styles.img} 
                        source={{
                            uri: this.props.route.params.result.mealPicUri
                        }}>
                        </Image>
                        <Paragraph style={{fontSize:20, fontWeight:'bold', marginTop:20}}>
                            $ {this.props.route.params.result.foodPrice}
                        </Paragraph>
                        <Paragraph style={{fontSize:12, fontWeight:'bold', marginTop:10}}>
                            Delivery Time: {this.props.route.params.result.time}
                        </Paragraph>
                        <Paragraph style={{fontSize:12, fontWeight:'bold', marginTop:10}}>
                            {this.props.route.params.result.foodDescription}
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