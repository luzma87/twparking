/* @flow */
import React from 'react';
import { scale } from 'react-native-size-matters';
import TWText from '../TWText/TWText';

type Props = {
  i18nLabel: string,
  labelPadding?: number,
};

const TWLabel = (props: Props) => {
  const { i18nLabel, labelPadding } = props;
  return (
    <TWText
      font="vt323"
      i18n={i18nLabel}
      style={{ width: scale(labelPadding), marginRight: 5 }}
      align="right"
    />
  );
};

TWLabel.defaultProps = {
  labelPadding: scale(60),
};

export default TWLabel;
