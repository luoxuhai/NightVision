import { PureComponent } from 'react';
import { requireNativeComponent, NativeModules, ViewStyle } from 'react-native';

const DepthCameraModule = NativeModules.DepthCameraView;

interface DepthCameraViewProps {
  style?: ViewStyle;
  enabled?: boolean;
  smoothed?: boolean;
  minDistanceDetection?: boolean;
  detectionWidthScale?: number;
  detectionHeightScale?: number;
  colorMode?: number;
  onMinDistance?: (distance: number) => void;
  onCameraSize?: (size: { width: number, height: number }) => void;
  onError?: () => void;
  onReady?: () => void;
  onPause?: () => void;
}

export class DepthCameraView extends PureComponent<DepthCameraViewProps> {
  constructor(props: DepthCameraViewProps) {
    super(props);
    this.onMinDistance = this.onMinDistance.bind(this);
  }

  private onMinDistance(event: any): void {
    this.props.onMinDistance?.(event.nativeEvent?.distance ?? -1);
  }

  private onCameraSize(event: any): void {
    const { width, height } = event.nativeEvent;
    this.props.onCameraSize?.({ width, height });
  }

  public static async supports(): Promise<boolean> {
    return await DepthCameraModule.supports();
  }

  public render() {
    return <NativeDeptCameraView {...this.props} onMinDistance={this.onMinDistance} onCameraSize={this.onMinDistance} />;
  }
}

const NativeDeptCameraView = requireNativeComponent<DepthCameraViewProps>(
  'DepthCameraView',
  // @ts-expect-error because the type declarations are kinda wrong, no?
  DepthCameraView,
);
