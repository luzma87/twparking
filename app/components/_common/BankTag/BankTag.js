/* @flow */
import React, { Component } from 'react';
import { Image } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import colors from '../../../styles/colors';

const pichinchaLogo = require('./images/pichincha.png');
const guayaquilLogo = require('./images/guayaquil.png');
const promericaLogo = require('./images/promerica.png');
const pacificoLogo = require('./images/pacifico.png');

type Props = {
  bank: string,
  size?: number,
  style: Object
};

class BankTag extends Component<Props, {}> {
  static defaultProps = {
    size: 16,
  };

  getLogoImage() {
    const { bank, size, style } = this.props;
    switch (bank.toLowerCase()) {
      case 'pichincha':
        return <Image source={pichinchaLogo} style={{ width: size, height: size, ...style }} />;
      case 'guayaquil':
        return <Image source={guayaquilLogo} style={{ width: size, height: size, ...style }} />;
      case 'promerica':
        return <Image source={promericaLogo} style={{ width: size, height: size, ...style }} />;
      case 'produbanco':
        return <Image source={promericaLogo} style={{ width: size, height: size, ...style }} />;
      case 'pacifico':
        return <Image source={pacificoLogo} style={{ width: size, height: size, ...style }} />;
      default:
        return (
          <FontAwesome5Pro
            light
            size={size}
            name="piggy-bank"
            color={colors.green600}
            style={style}
          />
        );
    }
  }

  render() {
    return this.getLogoImage();
  }
}


export default BankTag;
