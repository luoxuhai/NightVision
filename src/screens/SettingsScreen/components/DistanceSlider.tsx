import { PlatformColor, StyleSheet, View, ViewStyle, Text, TextStyle } from 'react-native';
import { observer } from 'mobx-react-lite';
import { human } from 'react-native-typography';
import Slider from '@react-native-community/slider';

import { ListCell } from '@/components';
import { t } from '@/locales';
import { useStore } from '@/store';

export const DistanceSlider = observer(() => {
  const store = useStore();

  return (
    <>
      <ListCell
        text={`${t('settingsScreen.advanced.distance')}${store?.minDistance} m`}
        bottomSeparator={false}
        rightIcon={null}
      />
      <ListCell style={$sliderCell} rightIcon={null}>
        <View style={$slider}>
          <Text style={$sliderIcon}>0.1 m</Text>
          <Slider
            style={{ flex: 1 }}
            value={store?.minDistance}
            minimumValue={0.1}
            maximumValue={5}
            step={0.1}
            tapToSeek
            onValueChange={(value) => {
              store?.setMinDistance(Number(value.toFixed(1)));
            }}
          />
          <Text style={$sliderIcon}>5 m</Text>
        </View>
      </ListCell>
    </>
  );
});

const $sliderCell: ViewStyle = {
  paddingHorizontal: 16,
};

const $slider: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 8,
};

const $sliderIcon: TextStyle = {
  ...StyleSheet.flatten(human.body),
  color: PlatformColor('label'),
};
