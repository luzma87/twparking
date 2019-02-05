// @flow
import React from 'react';
import { Badge } from 'react-native-elements';
import I18n from '../../i18n';

type Props = {
  size: "S" | "M" | "L" | "XL"
}

const SizeTag = (props: Props) => {
  const { size } = props;
  const i18nSize = `commons.size.${size.toUpperCase()}`;
  return (
    <Badge value={I18n.t(i18nSize)} status="primary" />
  );
};

export default SizeTag;
