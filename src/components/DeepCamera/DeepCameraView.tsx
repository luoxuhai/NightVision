import { PureComponent } from 'react';
import { requireNativeComponent, NativeModules, ViewStyle } from 'react-native';

const DeepCameraModule = NativeModules.DepthCameraView;

interface DeepCameraViewProps {
  style?: ViewStyle;
  minDistance?: number;
  distanceRectWidth?: number;
  distanceRectHeight?: number;
  colorMode?: number;
  onMinDistance?: (distance: number) => void;
  onError?: () => void;
  onReady?: () => void;
}

export class DeepCameraView extends PureComponent<DeepCameraViewProps> {
  constructor(props: CameraProps) {
    super(props);
    this.onMinDistance = this.onMinDistance.bind(this);
  }

  private onMinDistance(event: any): void {
    this.props.onMinDistance?.(event.nativeEvent?.distance ?? -1);
  }

  public static async supports(): Promise<boolean> {
      return await DeepCameraModule.supports();
  }

  public render() {
    return (
      <NativeDeepCameraView
        {...props}
        onMinDistance={this.onMinDistance}
      />
    );
  }
}

const NativeDeepCameraView = requireNativeComponent<NativeCameraViewProps>(
  'DepthCameraView',
  // @ts-expect-error because the type declarations are kinda wrong, no?
  DeepCameraView,
);
