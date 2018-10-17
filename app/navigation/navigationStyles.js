import { ScaledSheet } from 'react-native-size-matters';
import { colors } from '../styles/colors';

const navigationStyles = ScaledSheet.create({
  header: {
    backgroundColor: colors.deepPurple100,
  },

  headerTitle: {
    fontSize: '20@s',
    // fontFamily: fonts.latoBlack,
  },
});

export default navigationStyles;
