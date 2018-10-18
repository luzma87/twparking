/* @flow */
import React, {Component} from 'react';
import TWText from './TWText';
import type {fontSizes} from "./TWText";
import {colors} from "../../../styles/colors";

type Props = {
  text: string,
  size: fontSizes
};
type State = {};

class TWShadowedText extends Component<Props, State> {
  render() {
    const {text, variant: size} = this.props;
    return (
      <TWText
        text={text}
        weight="bold"
        size={size}
        color={colors.white}
        style={{
          textShadowColor: colors.grayAlpha,
          textShadowOffset: {width: 2, height: 2},
          textShadowRadius: 3,
        }}
      />
    );
  }
}

export default TWShadowedText;
