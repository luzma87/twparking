import { Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { colors } from '../../styles/colors';

const twHeaderStyles = ScaledSheet.create({

  container: {
    borderBottomColor: colors.gray2,
    borderTopColor: colors.transparent,
    borderLeftColor: colors.transparent,
    borderRightColor: colors.transparent,
    borderWidth: 0.25,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        alignItems: 'center',
      },
      android: {
        alignItems: 'flex-start',
        paddingLeft: '20@s',
      },
    }),
  },

  text: {
    color: colors.fiord3,
  },

  containerWithBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
    ...Platform.select({
      ios: {
        justifyContent: 'space-between',
        paddingTop: '15@vs',
      },
      android: {
        justifyContent: 'flex-start',
      },
    }),
  },

  backButton: {
    marginLeft: 15,
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
    ...Platform.select({
      ios: {},
      android: {
        marginRight: 15,
      },
    }),
  },

});

export default twHeaderStyles;
