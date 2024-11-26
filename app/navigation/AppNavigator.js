import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';

const Tabs = createBottomTabNavigator()

const AppNavigator = () => {
    return <Tabs.Navigator>
        <Tabs.Screen name='AudioList' component={AudioList} />
        <Tabs.Screen name='Player' component={Player} />
        <Tabs.Screen name='PlayList' component={PlayList} />
    </Tabs.Navigator>
}

export default AppNavigator; 