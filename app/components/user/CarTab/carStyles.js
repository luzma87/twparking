import { ScaledSheet } from 'react-native-size-matters';

const carStyles = ScaledSheet.create({
  warningMessage: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  scrollContainer: {
    paddingRight: '10%',
    paddingLeft: '10%',
  },
  carImage: {
    height: 130,
    marginTop: 40,
  },
});

export default carStyles;
