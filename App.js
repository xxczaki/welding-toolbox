import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-ionicons';

import HeatInput from './components/calculator';
import Weldability from './components/weldability';
import About from './components/about';

const TabNavigator = createBottomTabNavigator(
	{
		'Heat Input': HeatInput,
		Weldability,
		About
	},
	{
		defaultNavigationOptions: ({navigation}) => ({
			tabBarIcon: ({focused, tintColor}) => {
				const {routeName} = navigation.state;
				let iconName;

				if (routeName === 'Heat Input') {
					iconName = 'ios-flame';
					return <Icon name={iconName} size={25} color={tintColor}/>;
				}

				if (routeName === 'Weldability') {
					iconName = 'ios-calculator';
					return <Icon name={iconName} size={25} color={tintColor}/>;
				}

				if (routeName === 'About') {
					iconName = `ios-information-circle${focused ? '' : '-outline'}`;
					return <Icon name={iconName} size={25} color={tintColor}/>;
				}
			}
		}),
		tabBarOptions: {
			activeTintColor: 'dodgerblue',
			inactiveTintColor: 'gray'
		}
	}
);

export default createAppContainer(TabNavigator);
