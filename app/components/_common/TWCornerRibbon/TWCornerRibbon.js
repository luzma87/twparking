/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import TWText from '../TWText/TWText';
import colors from '../../../styles/colors';

type Props = {
  i18n: string,
  cornerRadius?: number,
  side?: 'left' | 'right'
};
type State = {};

class TWCornerRibbon extends Component<Props, State> {
  static defaultProps = {
    cornerRadius: 100,
    side: 'right',
  };

  render() {
    const { i18n, cornerRadius, side } = this.props;
    const usableCornerRadius = cornerRadius || 95;
    const labelHeight = Math.sqrt((usableCornerRadius ** 2) / 2);
    const labelWidth = labelHeight * 2;
    const originOffset = Math.sqrt(((labelHeight / 2) ** 2) / 2);
    const labelHorizontalPosition = -labelWidth / 2 + originOffset;
    const labelVerticalPosition = -labelHeight / 2 + originOffset;

    let labelPosition = { left: labelHorizontalPosition, top: labelVerticalPosition };
    let labelTransform = { transform: [{ rotate: '-45deg' }] };

    if (side === 'right') {
      labelPosition = { right: labelHorizontalPosition, top: labelVerticalPosition };
      labelTransform = { transform: [{ rotate: '45deg' }] };
    }

    return (
      <View style={[
        {
          position: 'absolute',
          justifyContent: 'flex-end',
        },
        labelPosition,
        labelTransform,
        { width: labelWidth, height: labelHeight },
      ]}
      >
        <View style={[{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary300,
          borderWidth: 3,
          borderColor: colors.secondary800,
          height: 30,
          padding: 3,
        },
        ]}
        >
          <TWText font="cormorantUpright" i18n={i18n} weight="bold" color={colors.secondary900} />
        </View>
      </View>
    );
  }
}

export default TWCornerRibbon;
