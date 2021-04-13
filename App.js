import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './pages/Home';
import ResultScreen from './pages/Result';
import OrderScreen from './pages/Order';
import ReceiptScreen from './pages/Receipt';
import DataGenerator from './pages/GenerateDataModule';

const Stack = createStackNavigator();
import 'react-native-gesture-handler';


export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator 
            screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#ff5600',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
            }}>
            <Stack.Screen name = "test" component = {DataGenerator}/>
            <Stack.Screen name = "Mystery Meal" component = {HomeScreen} />
            <Stack.Screen name = "Result" component = {ResultScreen} />
            <Stack.Screen name = "Order Confirmation" component = {OrderScreen}/>
            <Stack.Screen name = "Thank You!" component = {ReceiptScreen}/>
            
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
