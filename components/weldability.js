import React from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {RkButton, RkText, RkTextInput} from 'react-native-ui-kitten';
import {Col, Grid} from 'react-native-easy-grid';
import {Formik} from 'formik';

class Weldability extends React.Component {
		state = {
			ceq: '',
			cet: '',
			ceAws: '',
			pcm: '',
			pren: ''
		};

		render() {
			return (
				<Formik
					initialValues={{
						c: '',
						mn: '',
						cr: '',
						mo: '',
						v: '',
						ni: '',
						cu: '',
						si: '',
						b: '',
						n: ''
					}}
					onSubmit={async values => {
						Keyboard.dismiss();

						const c = Number(values.c.replace(/,/g, '.')) || 0;
						const mn = Number(values.mn.replace(/,/g, '.')) || 0;
						const cr = Number(values.cr.replace(/,/g, '.')) || 0;
						const mo = Number(values.mo.replace(/,/g, '.')) || 0;
						const v = Number(values.v.replace(/,/g, '.')) || 0;
						const ni = Number(values.ni.replace(/,/g, '.')) || 0;
						const cu = Number(values.cu.replace(/,/g, '.')) || 0;
						const si = Number(values.si.replace(/,/g, '.')) || 0;
						const b = Number(values.b.replace(/,/g, '.')) || 0;
						const n = Number(values.n.replace(/,/g, '.')) || 0;

						/* eslint-disable no-mixed-operators */

						const calculateCeq = () => {
							return (c + (mn / 6) + (cr + mo + v) / 5 + (ni + cu) / 15);
						};

						const calculateCet = () => {
							return (c + (mn + mo) / 10 + (cr + cu) / 20 + (ni / 40));
						};

						const calculateCeAws = () => {
							return (c + (mn / 6) + (cr + mo + v) / 5 + (ni + cu) / 15 + (si / 6));
						};

						const calculatePcm = () => {
							return (c + (si / 30) + (mn + cu + cr) / 20 + (ni / 60) + (mo / 15) + (v / 10) + 5 * b);
						};

						const calculatePren = () => {
							return (cr + (3.3 * mo) + (16 * n));
						};

						/* eslint-enable no-mixed-operators */

						const equationCeq = await Math.round(calculateCeq() * 100) / 100;
						const equationCet = await Math.round(calculateCet() * 100) / 100;
						const equationCeAws = await Math.round(calculateCeAws() * 100) / 100;
						const equationPcm = await Math.round(calculatePcm() * 100) / 100;
						const equationPren = await Math.round(calculatePren() * 100) / 100;

						this.setState({
							ceq: equationCeq,
							cet: equationCet,
							ceAws: equationCeAws,
							pcm: equationPcm,
							pren: equationPren
						});
					}}
					onReset={(values, {resetForm}) => {
						resetForm();
					}}
				>
					{props => (
						<ScrollView style={styles.container} scrollEnabled={false} keyboardShouldPersistTaps="handled">
							<Grid>
								<Col style={styles.column1}>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="C"
										value={props.values.c}
										maxLength={10}
										onChangeText={props.handleChange('c')}
										onBlur={props.handleBlur('c')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Mn"
										value={props.values.mn}
										maxLength={10}
										onChangeText={props.handleChange('mn')}
										onBlur={props.handleBlur('mn')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Si"
										value={props.values.si}
										maxLength={10}
										onChangeText={props.handleChange('si')}
										onBlur={props.handleBlur('si')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Cr"
										value={props.values.cr}
										maxLength={10}
										onChangeText={props.handleChange('cr')}
										onBlur={props.handleBlur('cr')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Ni"
										value={props.values.ni}
										maxLength={10}
										onChangeText={props.handleChange('ni')}
										onBlur={props.handleBlur('ni')}
									/>
								</Col>
								<Col style={styles.column2}>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Mo"
										value={props.values.mo}
										maxLength={10}
										onChangeText={props.handleChange('mo')}
										onBlur={props.handleBlur('mo')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="Cu"
										value={props.values.cu}
										maxLength={10}
										onChangeText={props.handleChange('cu')}
										onBlur={props.handleBlur('cu')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="V"
										value={props.values.v}
										maxLength={10}
										onChangeText={props.handleChange('v')}
										onBlur={props.handleBlur('v')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="N"
										value={props.values.n}
										maxLength={10}
										onChangeText={props.handleChange('n')}
										onBlur={props.handleBlur('n')}
									/>
									<RkTextInput
										style={styles.input}
										keyboardType="numeric"
										placeholder="B"
										value={props.values.b}
										maxLength={10}
										onChangeText={props.handleChange('b')}
										onBlur={props.handleBlur('b')}
									/>
								</Col>
								<Col style={styles.column3}>
									<RkText>CEQ: {this.state.ceq}</RkText>
									<RkText>CET: {this.state.cet}</RkText>
									<RkText>CE (AWS): {this.state.ceAws}</RkText>
									<RkText>PCM: {this.state.pcm}</RkText>
									<RkText>PREN: {this.state.pren}</RkText>
								</Col>
							</Grid>
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
		paddingTop: 50
	},
	input: {
		width: '50%'
	},
	column1: {
		paddingLeft: 20,
		justifyContent: 'center'
	},
	column2: {
		justifyContent: 'center'
	},
	column3: {
		paddingLeft: -20,
		justifyContent: 'center'
	},
	inline: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 50
	},
	button: {
		marginRight: 20
	}
});

export default Weldability;
