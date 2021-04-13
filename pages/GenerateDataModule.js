import React, {Component} from 'react';
import {Alert, Button, View} from 'react-native';
import { useFaker } from 'react-fakers';
import {createRestaurant} from '../service/service';

const YELP_URL = "https://api.yelp.com/v3/businesses/";

let myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer 6cSw7TDCQf52fAtzUrKIkRVwMWes3hhG2XkYrgRPcpDTCEfxMyjRFMsTuvIP3lwvL_R_upVLugC0QLg9MKjByvSm_CCGRjQKz07Tbs53OxqPl8pQGfO6yw3-8Qx1YHYx");

let requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const MIN_PRICE_EXP = 50;
const MAX_PRICE_EXP = 200;
const MIN_PRICE_MID = 18
const MAX_PRICE_MID = 50;
const MIN_PRICE_COMM = 12;
const MAX_PRICE_COMM = 18;
const MIN_PRICE_CHEAP = 5;
const MAX_PRICE_CHEAP = 12;
const MAX_FEERATE = 0.3;
const MIN_FEERATE = 0.1;
const precision = 100;

const handleData = (success) => {
    console.log("Created!")
    // console.log('success', success);
    const customData = require('../data/response (5).json').businesses;
    // console.log("demo:", customData[0]);
    // console.log(customData.length);
    const usefulData = customData.map((item, index) => {
        if (item.display_phone !== "" || item.phone !== "") {
            const {coordinates, 
                    display_phone, 
                    phone, 
                    id, 
                    image_url, 
                    location,
                    name,
                } = item;
            const usefulItem = {
                coordinates, 
                display_phone, 
                phone, 
                id, 
                image_url, 
                location,
                name,
            };
            usefulItem['latitude'] = usefulItem.coordinates.latitude;
            usefulItem['longitude'] = usefulItem.coordinates.longitude;
            usefulItem['address'] = usefulItem.location.address1 + ", ";
            if (usefulItem.location.address2 !== null && usefulItem.location.address2 !== "") {
                usefulItem['address'] += usefulItem.location.address2;
            }
            if (usefulItem.location.address3 !== null && usefulItem.location.address3 !== "") {
                usefulItem['address'] += usefulItem.location.address3;
            }
            usefulItem['address'] += usefulItem.location.city + ", " + usefulItem.location.state + " " + usefulItem.location.zip_code;
            usefulItem['deliveryID'] = "No.910827" + Math.floor(Math.random() * 10000);
            usefulItem['deliveryMan'] = success[Math.floor(Math.random() * 10)].firstname;
            let dice = Math.floor(Math.random() * 10);
            if (dice <= 5) {
                usefulItem['foodPrice'] = Math.floor(Math.random() * (MAX_PRICE_CHEAP - MIN_PRICE_CHEAP) * precision + MIN_PRICE_CHEAP * precision) / precision;
            } else if (dice <= 7) {
                usefulItem['foodPrice'] = Math.floor(Math.random() * (MAX_PRICE_COMM - MIN_PRICE_COMM) * precision + MIN_PRICE_COMM * precision) / precision;
            } else if (dice <= 8) {
                usefulItem['foodPrice'] = Math.floor(Math.random() * (MAX_PRICE_MID - MIN_PRICE_MID) * precision + MIN_PRICE_MID * precision) / precision;
            } else {
                usefulItem['foodPrice'] = Math.floor(Math.random() * (MAX_PRICE_EXP - MIN_PRICE_EXP) * precision + MIN_PRICE_EXP * precision) / precision;
            }
            usefulItem['mealName'] = usefulItem['name'];
            usefulItem['mealPicUri'] = usefulItem['image_url'];
            usefulItem['multiFee'] = Math.floor(usefulItem.foodPrice * Math.floor(Math.random() * (MAX_FEERATE - MIN_FEERATE) * precision + MIN_FEERATE * precision) / precision * precision) / precision; 
            usefulItem['orderStatus'] = "Preparing Your Order";
            usefulItem['paymentMethod'] = Math.random() < 0.5 ? "Wechat" : "Alipay";
            usefulItem['tablewareNeeded'] = Math.random() < 0.5 ? true : false;
            usefulItem['untouchableDelivery'] = Math.random() < 0.9 ? true : false;
            let timePart = dice <= 5 ? " AM" : " PM";
            let hour = 'NaN';
            let minute = 'NaN';
            if (dice <= 5) {
                dice = Math.random();
                hour = dice < 0.5 ? "10" : "11";
                if (dice <= 0.3) {
                    minute = "10";
                } else if (dice <= 0.6) {
                    minute = "40";
                } else {
                    minute = "50";
                }
            } else {
                dice = Math.random();
                hour = dice < 0.5 ? "12" : "13";
                if (dice <= 0.3) {
                    minute = "20";
                } else if (dice <= 0.6) {
                    minute = "00";
                } else {
                    minute = "30";
                }
            }
            usefulItem['time'] = hour + ":" + minute + timePart;
            // console.log(index, ":", usefulItem);
            return usefulItem;
        }
    })
    // console.log('usefulData', usefulData.length);
    usefulData.forEach(item => {
        if (item !== undefined) {
            createRestaurant(item);
        }
    })
}

const generator = () => {

    const { success } = useFaker();

    return (
        <View>
            <Button title="generate" onPress={() => handleData(success)}>

            </Button>
        </View>
    )
}

export default generator;