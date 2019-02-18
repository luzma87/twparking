// @flow
import React from 'react';
import { Badge } from 'react-native-elements';
import I18n from '../../i18n';
import type { CarSize } from '../../context/types';

type Props = {
  size: CarSize
}

const SizeTag = (props: Props) => {
  const { size } = props;
  const i18nSize = `commons.size.${size.toUpperCase()}`;
  return (
    <Badge value={I18n.t(i18nSize)} status="primary" />
  );
};

export default SizeTag;
