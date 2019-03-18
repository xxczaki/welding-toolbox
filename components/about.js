import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View, Linking} from 'react-native';
import {AppLoading, Asset} from 'expo';

import pkg from '../package';

function cacheImages(images) {
	return images.map(image => {
		if (typeof image === 'string') {
			return Image.prefetch(image);
		}

		return Asset.fromModule(image).downloadAsync();
	});
}

class About extends React.Component {
	state = {
		isReady: false
	};

	async _loadAssetsAsync() {
		const imageAssets = cacheImages([
			require('../assets/icon.png'),
			require('../assets/patreon.png')
		]);

		await imageAssets;
	}

	render() {
		if (!this.state.isReady) {
			return (
				<AppLoading
					startAsync={this._loadAssetsAsync}
					onFinish={() => this.setState({isReady: true})}
					onError={console.warn}
				/>
			);
		}

		return (
			<View style={styles.container}>
				<Image style={styles.icon} source={require('../assets/icon.png')}/>
				<Text style={styles.title}>Welding Toolbox</Text>
				<Text style={styles.version}>Version {pkg.version}</Text>
				<Text>MIT License © Antoni Kepinski</Text>
				<Text style={styles.description}>If you enjoy using this app, please rate it :)</Text>
				<TouchableOpacity style={styles.link} onPress={() => Linking.openURL('https://patreon.com/akepinski')}>
					<Image style={styles.patreon} source={require('../assets/patreon.png')}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50,
		paddingBottom: 40,
		paddingLeft: 20,
		paddingRight: 20
	},
	icon: {
		width: 128,
		height: 128
	},
	title: {
		fontSize: 20
	},
	version: {
		color: 'gray',
		paddingTop: 10,
		paddingBottom: 10
	},
	description: {
		paddingTop: 30,
		paddingBottom: 10
	},
	link: {
		marginTop: 'auto'
	},
	patreon: {
		width: 159,
		height: 47,
		borderRadius: 25
	}
});

export default About;
