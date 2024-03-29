import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Components
import GroceryStoreSearch from './GroceryStoreSearch';
import Map from './map';
import InventorySearch from './InventorySearch';
import ShoppingCart from './ShoppingCart';

// Other
import { Colors } from '../CommonStyles';
import { Fontisto } from '@expo/vector-icons';
import { useFonts, ComicNeue_700Bold } from '@expo-google-fonts/comic-neue';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function ComponentWrapper() {
    let [fontsLoaded] = useFonts({ComicNeue_700Bold});

    return (
        <NavigationContainer>
            <Stack.Navigator styles={styles.grocery}>
                <Stack.Screen name="Stores" component={GroceryStoreSearch}
                    options={{
                        headerShown: false,
                    }}
                ></Stack.Screen>
                <Stack.Screen name="Search" component={StoreTabs}
                    options={{
                        headerTitle: "",
                        headerTintColor: Colors.green,
                        headerStyle: { backgroundColor: Colors.beige },
                        headerBackTitleStyle: { 
                            color: Colors.green, 
                            fontSize: 28, 
                            fontFamily: 'ComicNeue_700Bold'
                        },
                    }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function StoreTabs() {
    return (
        <Tab.Navigator 
            tabBarBadge={true} 
            barStyle={styles.navbar} 
            shifting={false}
            labeled={false}
            activeColor={Colors.green}
            inactiveColor='white'
            
        >
            <Tab.Screen name="Search" component={InventorySearch}
            options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (
                <Fontisto name="search" color={color} size={18} />
                )
            }}
            />
            <Tab.Screen name="Cart" component={ShoppingCart}
            options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color }) => (
                <Fontisto name="shopping-basket" color={color} size={18} />
                )
            }}
            />
            <Tab.Screen name="Map" component={Map}
            options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color }) => (
                <Fontisto name="map-marker-alt" color={color} size={18} />
                )
            }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  navbar: {
    height: 75,
    backgroundColor: 'black',
    borderWidth: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'absolute'
  },
  grocery: {

  }
});
