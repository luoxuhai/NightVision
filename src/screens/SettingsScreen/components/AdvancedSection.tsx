import { Switch } from 'react-native';
import { observer } from 'mobx-react-lite';

import { ListCell, ListSection } from '@/components';
import { t } from '@/locales';
import { useStore } from '@/store';
import { DistanceCell } from './DistanceCell';

export const AdvancedSection = observer(() => {
  const store = useStore();

  return (
    <ListSection headerText={t('settingsScreen.advanced.title')}>
      <ListCell
        text={t('settingsScreen.advanced.saveCameraImage')}
        rightIcon={null}
        RightAccessory={
          <Switch
            value={store.isTakeCameraPhoto}
            onValueChange={(value) => {
              store.setIsTakeCameraPhoto(value);
            }}
          />
        }
      />
      <ListCell
        text={t('settingsScreen.advanced.smoothed')}
        rightIcon={null}
        RightAccessory={
          <Switch
            value={store.smoothed}
            onValueChange={(value) => {
              store.setSmoothed(value);
            }}
          />
        }
      />
      <ListCell
        text={t('settingsScreen.advanced.shake')}
        rightIcon={null}
        RightAccessory={
          <Switch
            value={store.shake}
            onValueChange={(value) => {
              store.setShake(value);
            }}
          />
        }
      />
      <DistanceCell />
    </ListSection>
  );
});
