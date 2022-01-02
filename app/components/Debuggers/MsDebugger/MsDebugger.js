import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

// localstorage
import { readItemFromStorage } from '../../../helpers/handleStorage';

export const MsDebuggerRedux = () => {
	const RdxRoot = useSelector((state) => state);

	useEffect(() => {}, []);
	return <MsDebugger value={RdxRoot} name='Redux' />;
};

export const MsDebuggerLocalStorage = () => {
	const [StgRoot, setStgRoot] = useState({});

	const getCurrentStorage = async () => {
		await readItemFromStorage().then((responseStorage) =>
			setStgRoot(responseStorage)
		);
	};

	useEffect(() => {
		getCurrentStorage();
	}, []);

	return <MsDebugger value={StgRoot} name='LocalStorage' />;
};

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
