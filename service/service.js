import {db} from '../db';
import { getDistance } from 'geolib';

// export const createRestaurant = () => {
//     db.ref('/restaurants').push(
//         {
//             address : "1095 Hamilton St, Vancouver, BC V6B 5T4",
//             deliveryID : "No.9108270116",
//             deliveryMan : "Rexxay",
//             foodDescription : "Destination in a heritage warehouse space offering sustainable seafood with innovative touches",
//             foodPrice : "129.99",
//             mealName : "Blue Water Cafe",
//             mealPicUri : "https://lh5.googleusercontent.com/p/AF1QipO7soK0I23MQ9XyiJ4q-j6wyiOHzVXM1B16Zxq9=w195-h120-p-k-no",
//             multiFee : "18.99",
//             note : "We hope we served our best!",
//             orderStatus : "Preparing Your Order",
//             paymentMethod : "Visa",
//             phoneNumber : "+16046888078",
//             tablewareNeeded : true,
//             time : "4:35 PM",
//             untouchableDelivery : true,
//       }
//     );
// }

// export const findRestaurant = async () => {
//     let rest = "The address is loading...";
//     let obj = await db.ref("/restaurants").
//                 orderByChild('paymentMethod').
//                 equalTo('Alipay').
//                 once('value', snapshot => {
//                     const record = snapshot.val();
//                     rest = Object.values(record)[0];
//                     // console.log('rest in service', rest);
//                 })
//     // console.log('address in service:', rest);
//     return rest;
// }

export const findRestaurant = async (price, distance, currentLocation) => {
    let lowPrice = -1;
    let highPrice = -1;
    let range = -1;
    let rest = "The address is loading...";
    switch (price) {
        case "1.0": lowPrice = 0; highPrice = 12.0; break;
        case "2.0": lowPrice = 12.01; highPrice = 18.0; break;
        case "3.0": lowPrice = 18.01; highPrice = 25.0; break;
        case "4.0": lowPrice = 25.01; highPrice = 99.99; break;
        default : 
    }
    switch (distance) {
        case "0.5": range = 500; break;
        case "2.0": range = 2000; break;
        case "3.0": range = 3000; break;
        case "5.0": range = 5000; break;
        case "10.0": range = 10000; break;
        default: 
    }
    let obj = await db.ref("/restaurants").orderByChild('foodPrice').startAt(lowPrice).endAt(highPrice).
                once('value', snapshot => {
                    const record = snapshot.val();
                    const recordArray = Object.values(record); 
                    const result = recordArray.filter(element => {
                        const {latitude, longitude} = element;
                        const restaurantLocation = {latitude, longitude};
                        if (getDistance(restaurantLocation, currentLocation) < range) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    let index = Math.floor((Math.random() * result.length));
                    console.log("index", index);
                    rest = result[index]
    })
    return rest;
}