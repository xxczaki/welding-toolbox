import React from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import {Formik} from 'formik';

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

					const evaluate = () => {
						const amps = parseInt(values.amps, 10);
						const volts = parseInt(values.volts, 10);
						const weldingSpeed = parseInt(values.weldingSpeed, 10);
						const efficiencyFactor = parseFloat(values.efficiencyFactor.replace(/,/g, '.'));

						return (amps * volts * (efficiencyFactor / 10) / weldingSpeed);
					};

					const equation = Math.round(evaluate() * 100) / 100;

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
						<RkText style={styles.title}>Heat Input Calculator</RkText>
						<RkText style={styles.result}>Heat Input: {this.state.heatInput} kJ/mm</RkText>
						<View style={styles.inputs}>
							<RkTextInput
								style={{marginRight: 10}}
								keyboardType="numeric"
								placeholder="Amps"
								value={props.values.amps}
								maxLength={10}
								onChangeText={props.handleChange('amps')}
								onBlur={props.handleBlur('amps')}
							/>
							<RkTextInput
								style={{marginLeft: 10}}
								keyboardType="numeric"
								placeholder="Volts"
								value={props.values.volts}
								maxLength={10}
								onChangeText={props.handleChange('volts')}
								onBlur={props.handleBlur('volts')}
							/>
						</View>
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
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 20
	},
	inputs: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		marginTop: 20
	},
	inline: {
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginTop: 10
	},
	button: {
		marginRight: 20
	},
	result: {
		fontSize: 20
	}
});
