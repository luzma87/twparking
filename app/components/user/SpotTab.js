/* @flow */
import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import { Popup } from 'react-native-map-link';
import withContext from '../../context/WithContext';
import styles from './CarTab/carStyles';
import InputForm from '../_common/InputForm/InputForm';
import colors from '../../styles/colors';
import type { GlobalContext } from '../../context/types';
import TWButton from '../_common/TWFormControls/TWButton';

type Props = {
  context?: GlobalContext,
};
type State = {};

const source = { latitude: -0.185251, longitude: -78.481786 };

class SpotTab extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      spot: {},
      isVisible: false,
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    const { spot } = user;
    this.setState({ spot });
  }

  render() {
    const { spot, isVisible } = this.state;
    return (
      <View>
        <ScrollView
          style={styles.scrollContainer}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 20,
                paddingHorizontal: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <FontAwesome5Pro
                solid
                inverted
                size={100}
                name="parking-circle"
                color={colors.secondary500}
              />
              <FontAwesome5Pro
                solid
                inverted
                size={100}
                name="car"
                color={colors.primary800}
              />
            </View>

            <InputForm
              inputProps={{ editable: false }}
              uppercase
              field={spot.size}
              i18nLabel="screens.user.spot.form.size"
              i18nPlaceholder="screens.user.spot.form.sizePlaceholder"
            />

            <InputForm
              inputProps={{ editable: false }}
              uppercase
              field={spot.number}
              i18nLabel="screens.user.spot.form.number"
              i18nPlaceholder="screens.user.spot.form.numberPlaceholder"
            />

            <InputForm
              field={spot.address}
              inputProps={{ editable: false }}
              i18nLabel="screens.user.spot.form.address"
              i18nPlaceholder="screens.user.spot.form.addressPlaceholder"
            />

            <InputForm
              field={spot.building}
              inputProps={{ editable: false }}
              i18nLabel="screens.user.spot.form.building"
              i18nPlaceholder="screens.user.spot.form.buildingPlaceholder"
            />

            <InputForm
              field={spot.cost}
              inputProps={{ editable: false }}
              i18nLabel="screens.user.spot.form.cost"
              i18nPlaceholder="screens.user.spot.form.costPlaceholder"
            />

            <TWButton
              i18n="screens.user.spot.form.map"
              icon="map"
              iconSize={30}
              buttonColor={colors.blueGray800}
              onPress={() => {
                this.setState({ isVisible: true });
              }}
            />
          </View>

        </ScrollView>


        <Popup
          isVisible={isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          modalProps={{
            animationIn: 'slideInUp',
          }}
          options={{
            latitude: spot.latitude,
            longitude: spot.longitude,
            sourceLatitude: source.latitude,
            sourceLongitude: source.longitude,
          }}
        />
      </View>
    );
  }
}

export default withContext(SpotTab);
