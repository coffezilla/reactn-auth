import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import MenuDebugger from '../components/Debuggers/MenuDebugger';

import {
	MsDebuggerRedux,
	MsDebuggerLocalStorage,
} from '../components/Debuggers/MsDebugger';

const About = () => {
	return (
		<ScrollView style={styles.container}>
			<MenuDebugger />
			<MsDebuggerRedux />
			<MsDebuggerLocalStorage />
		</ScrollView>
	);
};

export default About;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
});
