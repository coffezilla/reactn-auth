import { Text, View } from 'react-native';

const MsDebugger = ({ value, name }) => {
	return (
		<View
			style={{
				backgroundColor: '#f2f2f2',
				width: '100%',
				paddingHorizontal: 10,
			}}
		>
			<Text
				style={{
					backgroundColor: '#1e1e1e',
					paddingHorizontal: 10,
					color: 'white',
					paddingVertical: 5,
					fontWeight: 'bold',
				}}
			>
				{name}: MsDebugger
			</Text>
			<Text
				style={{
					fontSize: 12,
					padding: 10,
					borderWidth: 1,
					borderColor: '#1e1e1e',
				}}
			>
				{JSON.stringify(value, null, 1)}
			</Text>
		</View>
	);
};

export default MsDebugger;
