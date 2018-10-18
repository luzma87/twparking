/* @flow */
import { Dimensions, Platform } from 'react-native';

const IPHONE_X_HEIGHT = 812;
const TINY_SCREEN_THRESHOLD = 568;

const isiPhone = () => Platform.OS === 'ios';
const isiPhoneX = () => (isiPhone() && Dimensions.get('window').height === IPHONE_X_HEIGHT);
const isTinyPhone = () => (Dimensions.get('window').height <= TINY_SCREEN_THRESHOLD);
const isAndroid = !isiPhone();

const deviceHelper = {
  isiPhone,
  isiPhoneX,
  isTinyPhone,
  isAndroid,
};

export default deviceHelper;
