import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
import colors from '../../../styles/colors';

const twModalStyles = ScaledSheet.create({

  modal: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: colors.blueGray400,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Dimensions.get('window').height / 3,
    borderRadius: 50,
    width: '80%',
    minHeight: 280,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  content: {
    backgroundColor: colors.blueGray300,
    justifyContent: 'center',
    width: '95%',
    alignItems: 'center',
    height: 270,
    borderRadius: 50,
  },
});

export default twModalStyles;
