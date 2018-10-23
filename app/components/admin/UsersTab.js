/* @flow */
import React from 'react';
import { View } from 'react-native';
import TWButton from '../_common/TWButton/TWButton';

const AdminUsers = () => (
  <View>
    <TWButton
      titleI18n="title"
      onPress={() => { console.warn('yay'); }}
    />
  </View>
);

export default AdminUsers;
