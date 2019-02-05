import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueGray500,
    borderRadius: 4,
    color: 'black',
    marginBottom: 4,
    marginLeft: 10,
  },
  inputAndroid: {
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: colors.blueGray500,
    borderRadius: 4,
    color: 'black',
    marginBottom: 4,
  },
});

export default pickerSelectStyles;
