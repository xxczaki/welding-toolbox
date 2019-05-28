import React, {useState} from 'react';
import {Clipboard, StyleSheet, View, ScrollView, Keyboard, TouchableOpacity} from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import {Dropdown} from 'react-native-material-dropdown';
import {Formik} from 'formik';
import sec from 'sec';

const HeatInput = () => {
	const [heatInput, setHeatInput] = useState('0');

	const data = [{
		label: '0.6 - 141, 15',
		value: '0.6'
	}, {
		label: '0.8 - 111, 114, 131, 135, 136, 138',
		value: '0.8'
	}, {
		label: '1 - 121',
		value: '1'
	}];

	return (
		<Formik
			initialValues={{
				amps: '',
				volts: '',
				lenght: '',
				time: '',
				efficiencyFactor: ''
			}}
			onSubmit={values => {
				Keyboard.dismiss();

				const evaluate = () => {
					const amps = Number(values.amps);
					const volts = Number(values.volts);
					const lenght = Number(values.lenght);
					const time = sec(values.time);
					const efficiencyFactor = Number(values.efficiencyFactor.replace(/,/g, '.'));

					return ((volts * amps * efficiencyFactor) / (lenght / time * 1000));
				};

				const equation = Math.round(evaluate() * 100) / 100;

				if (isNaN(equation)) {
					setHeatInput('0');
				} else {
					setHeatInput(equation);
				}
			}}
			onReset={(values, {resetForm}) => {
				resetForm();
				setHeatInput('0');
			}}
		>
			{props => (
				<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} scrollEnabled={false} keyboardShouldPersistTaps="handled">
					<RkText style={styles.title}>Heat Input Calculator</RkText>
					<TouchableOpacity onPress={() => Clipboard.setString(`${heatInput}`)}>
						<RkText style={styles.result}>Heat Input: {heatInput} kJ/mm</RkText>
					</TouchableOpacity>
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
					<View style={styles.inputs}>
						<RkTextInput
							style={{marginRight: 10}}
							keyboardType="numeric"
							placeholder="Lenght (mm)"
							value={props.values.lenght}
							maxLength={10}
							onChangeText={props.handleChange('lenght')}
							onBlur={props.handleBlur('lenght')}
						/>
						<RkTextInput
							style={{marginLeft: 10}}
							placeholder="Time (mm:ss)"
							value={props.values.time}
							maxLength={10}
							onChangeText={props.handleChange('time')}
							onBlur={props.handleBlur('time')}
						/>
					</View>
					<Dropdown
						containerStyle={styles.dropdown}
						label="Efficiency Factor"
						data={data}
						onChangeText={props.handleChange('efficiencyFactor')}
					/>
					<View style={styles.inline}>
						<RkButton style={styles.RkButton} onPress={props.handleSubmit}>Calculate</RkButton>
						<RkButton rkType="danger" onPress={props.handleReset}>Reset</RkButton>
					</View>
				</ScrollView>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	RkButton: {
		marginRight: 20
	},
	result: {
		fontSize: 20
	},
	dropdown: {
		width: 300,
		paddingBottom: 20
	}
});

export default HeatInput;
