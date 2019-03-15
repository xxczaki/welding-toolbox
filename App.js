import React from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import {Formik} from 'formik';
import math from 'mathjs';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			heatInput: ''
		};
	}

	render() {
		return (
			<Formik
				initialValues={{
					amps: '',
					volts: '',
					weldingSpeed: '',
					efficiencyFactor: ''
				}}
				onSubmit={values => {
					Keyboard.dismiss();
					const amps = parseInt(values.amps, 10);
					const volts = parseInt(values.volts, 10);
					const weldingSpeed = parseInt(values.weldingSpeed, 10);
					const efficiencyFactor = parseFloat(values.efficiencyFactor.replace(/,/g, '.'));

					const equation = math.round(math.chain(amps).multiply(volts).multiply(efficiencyFactor / 10).divide(weldingSpeed).done(), 5);

					if (isNaN(equation)) {
						this.setState({heatInput: ''});
					} else {
						this.setState({heatInput: equation});
					}
				}}
				onReset={(values, {resetForm}) => {
					resetForm();
				}}
			>
				{props => (
					<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} scrollEnabled={false} keyboardShouldPersistTaps="handled">
						<RkTextInput
							keyboardType="numeric"
							placeholder="Amps"
							value={props.values.amps}
							maxLength={10}
							onChangeText={props.handleChange('amps')}
							onBlur={props.handleBlur('amps')}
						/>
						<RkTextInput
							keyboardType="numeric"
							placeholder="Volts"
							value={props.values.volts}
							maxLength={10}
							onChangeText={props.handleChange('volts')}
							onBlur={props.handleBlur('volts')}
						/>
						<RkTextInput
							keyboardType="numeric"
							placeholder="Welding Speed (mm/min)"
							value={props.values.weldingSpeed}
							maxLength={10}
							onChangeText={props.handleChange('weldingSpeed')}
							onBlur={props.handleBlur('weldingSpeed')}
						/>
						<RkTextInput
							keyboardType="numeric"
							placeholder="Efficiency Factor"
							value={props.values.efficiencyFactor}
							maxLength={3}
							onChangeText={props.handleChange('efficiencyFactor')}
							onBlur={props.handleBlur('efficiencyFactor')}
						/>
						<View style={styles.inline}>
							<RkButton style={styles.button} onPress={props.handleSubmit}>Calculate</RkButton>
							<RkButton rkType="danger" onPress={props.handleReset}>Reset</RkButton>
						</View>
						<RkText style={styles.result}>Heat Input: {this.state.heatInput} kJ/mm</RkText>
					</ScrollView>
				)}
			</Formik>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 20,
		paddingRight: 20
	},
	contentContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	inline: {
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row'
	},
	button: {
		marginRight: 20
	},
	result: {
		fontSize: 20,
		marginTop: 20
	}
});
