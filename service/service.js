import { Alert } from 'react-native';
import {db} from '../db';

export const createRestaurant = () => {
    db.ref('/restaurants').push({
        foodDescription: "This is amazing Chinese food",
        address:"7733 Firbridgeway, Vancouver, BC V5X 0C4",
        phoneNumber:"+16729936501",
        time:"13:00 PM",
        paymentMethod: "Alipay",
        foodPrice: "21.99",
        multiFee: "4.99",
        orderStatus: "Preparing Your Order",
        deliveryID: "No.897571977",
        deliveryMan: "Magry",
        untouchableDelivery: true,
        tablewareNeeded: true, 
    });
}

export const findRestaurant = async () => {
    let rest = "The address is loading...";
    let obj = await db.ref("/restaurants").
                orderByChild('paymentMethod').
                equalTo('Alipay').
                once('value', snapshot => {
                    const record = snapshot.val();
                    rest = Object.values(record)[0];
                    // console.log('rest in service', rest);
                })
    // console.log('address in service:', rest);
    return rest;
}