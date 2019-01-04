import { scale, ScaledSheet } from 'react-native-size-matters';

const paymentStyles = ScaledSheet.create({
  header: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '8%',
  },
  headerTag: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginLeft: scale(15),
    paddingLeft: 10,
    flex: 1,
  },
  form: {
    paddingLeft: '8%',
    paddingRight: '10%',
    marginTop: scale(20),
  },
});

export default paymentStyles;
