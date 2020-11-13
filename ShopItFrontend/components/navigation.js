import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'
import ActionButton from 'react-native-circular-action-menu';

const windowHeight = Dimensions.get('window').height;

function Menu({ pressCallback }) {
    return (
        <View style={{position: 'absolute', height: windowHeight - 40, backgroundColor: '#f3f3f3'}}>
          <ActionButton buttonColor='#00edb6' btnOutRange='#dbdbdb' radius={100} size={67} itemSize={40}>
            <ActionButton.Item buttonColor='#00edb6' angle={3.28} title="Search" onPress={() => {
              pressCallback("Search");
            }}>
              <Icon type='evilicon' name='search' color='#ffffff' style={styles.actionButtonIcon} />
            </ActionButton.Item>

            <ActionButton.Item buttonColor='#00edb6' title="Cart" onPress={() => {
              pressCallback("Cart");
            }}>
              <Icon type='evilicon' name='cart' color='#ffffff' style={styles.actionButtonIcon} />
            </ActionButton.Item>
            
            <ActionButton.Item buttonColor='#00edb6' angle={-0.14} title="Map" onPress={() => {
              pressCallback("Map");
            }}>
              <Icon type='evilicon' name='location' color='#ffffff' style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      height: 22
    },
});

export default Menu;