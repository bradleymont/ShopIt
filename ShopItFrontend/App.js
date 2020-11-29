import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// Components
import GroceryStoreSearch from './components/GroceryStoreSearch';
import Map from './components/map';
import InventorySearch from './components/InventorySearch';
import ShoppingCart from './components/ShoppingCart';

// Other
import { Colors } from './CommonStyles';
import { GroceryProvider } from './components/GlobalItemStore';
import { Fontisto } from '@expo/vector-icons';
import { create } from 'lodash';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  const [ mode, setMode ] = useState("Search");
  const changeMode = (newMode) => { setMode(newMode) };

  /*
  useEffect(() => {
    async function initGlobalState() {
      try {
        await retrieveStoreData();


        setSelectedStoreData(getGroceryStoreData());
      }
      catch (err) {
        console.log(err);
      }
    }
    initGlobalState();
  }, []);
  */
  
  //return selectedStoreData == null ? <Text>waiting</Text> : // TODO: change this to a loading screen
  return (
      <GroceryProvider>
        <NavigationContainer>
          <Tab.Navigator 
            tabBarBadge={true} 
            barStyle={styles.navbar} 
            shifting={false}
            labeled={false}
            activeColor={Colors.green}
            inactiveColor='white'
          >
            <Tab.Screen name="Stores" component={GroceryStoreSearch}
              options={{
                tabBarLabel: 'Stores',
                tabBarIcon: ({ color }) => (
                  <Fontisto name="map" color={color} size={18} />
                )
              }}
            />
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
        </NavigationContainer>
    </GroceryProvider>
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
  }
});

// for testing/demonstration purposes
/*
const TestComp = () => {

  // retrieve globalState (global state) amd dispatch (function to update global state) from context
  const {globalState, dispatch} = React.useContext(GroceryContext);

  //console.log(globalState);

  // update the global state by using dispatch to perform an action
  return <Text onPress={() => dispatch({
    type: 'addToCart',
    payload: {
      name: 'test',
      description: 'test item', 
      retrieved: false
    }
  })}>
    test
  </Text>;
}
*/