/* @flow */
import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import TWText from '../_common/TWText/TWText';
import withContext from '../../context/WithContext';
import styles from './CarTab/carStyles';
import Plate from './CarTab/Plate';
import InputForm from '../_common/InputForm/InputForm';
import colors from '../../styles/colors';
import carHelper from '../../util/carHelper';

type Props = {};
type State = {};

class SpotTab extends Component<Props, State> {
  static defaultProps = {
    context: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      spot: {},
    };
  }

  componentDidMount() {
    const { context } = this.props;
    const { user } = context;
    const { spot } = user;
    // car.vehicle = sample(vehicles);
    this.setState({ spot });
  }

  render() {
    const { spot } = this.state;
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
                name="parking"
                color={colors.secondary500}
              />
              <FontAwesome5Pro
                solid
                inverted
                size={100}
                name="car"
                color={colors.secondary500}
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

          </View>

        </ScrollView>


      </View>
    );
  }
}

export default withContext(SpotTab);
