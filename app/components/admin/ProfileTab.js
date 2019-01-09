/* @flow */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import TWText from '../_common/TWText/TWText';
import appNavigation from '../../navigation/Routes';
import withContext from '../../context/WithContext';
import type { GlobalContext } from '../../context/types';
import TWButton from '../_common/TWFormControls/TWButton';
import TWMetroButton from '../_common/TWFormControls/TWMetroButton';

type Props = {
  navigation: Object,
  context?: GlobalContext
};
type State = {};

class AdminProfile extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  changeUser() {
    const { navigation } = this.props;
    navigation.navigate(appNavigation.navigationTree.UserHome);
  }

  render() {
    const { context } = this.props;
    return (
      <ScrollView>
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: 10,
        }}
        >
          <TWText text={`this is the AdminProfile screen [${context ? context.user.name : ''}]`} />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-wizard"
            iconSize={20}
            tint="primary"
          />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-wizard"
            iconSize={20}
            tint="primary"
          />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-wizard"
            iconSize={20}
            tint="primary"
          />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-wizard"
            iconSize={20}
            tint="primary"
          />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="alicorn"
            iconSize={20}
            tint="secondary"
            widthRatio={2}
            uppercase
          />
          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="unicorn"
            iconSize={20}
            tint="green"
            widthRatio={2}
            heightRatio={2}
            uppercase
          />
          <View>
            <TWMetroButton
              i18n="commons.buttons.save"
              onPress={() => {}}
              icon="spider-black-widow"
              iconSize={20}
              tint="blue"
            />
            <TWMetroButton
              i18n="commons.buttons.save"
              onPress={() => {}}
              icon="hat-witch"
              iconSize={20}
              tint="yellow"
            />
          </View>

          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-witch"
            iconSize={20}
            tint="blueGray"
            widthRatio={1}
            heightRatio={3}
          />
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TWMetroButton
                i18n="commons.buttons.save"
                onPress={() => {}}
                icon="spider-black-widow"
                iconSize={20}
                tint="blue"
              />
              <TWMetroButton
                i18n="commons.buttons.save"
                onPress={() => {}}
                icon="spider-black-widow"
                iconSize={20}
                tint="blue"
              />
            </View>
            <TWMetroButton
              i18n="commons.buttons.save"
              onPress={() => {}}
              icon="hat-witch"
              iconSize={20}
              tint="secondary"
              widthRatio={2}
            />
            <View style={{ flexDirection: 'row' }}>
              <TWMetroButton
                i18n="commons.buttons.save"
                onPress={() => {}}
                icon="hat-witch"
                iconSize={20}
                tint="yellow"
              />
              <TWMetroButton
                i18n="commons.buttons.save"
                onPress={() => {}}
                icon="hat-witch"
                iconSize={20}
                tint="yellow"
              />
            </View>
          </View>

          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-witch"
            iconSize={20}
            tint="blueGray"
            widthRatio={3}
          />

          <TWMetroButton
            i18n="commons.buttons.save"
            onPress={() => {}}
            icon="hat-witch"
            iconSize={20}
            tint="blueGray"
            widthRatio={3}
            heightRatio={3}
          />

          <TWButton
            i18n="toggles.toRegular"
            icon="user"
            onPress={() => this.changeUser()}
            style={{ marginVertical: 40 }}
          />
        </View>
      </ScrollView>
    );
  }
}

export default withContext(AdminProfile);
