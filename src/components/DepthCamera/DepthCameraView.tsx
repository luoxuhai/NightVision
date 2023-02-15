import { PureComponent, createRef } from 'react';
import { requireNativeComponent, NativeModules, findNodeHandle, ViewStyle } from 'react-native';

const DepthCameraModule = NativeModules.DepthCameraView;

interface TakePictureOptions {
  quality?: number;
}

export interface DepthCameraViewProps {
  style?: ViewStyle;
  enabled?: boolean;
  smoothed?: boolean;
  minDistanceDetection?: boolean;
  detectionWidthScale?: number;
  detectionHeightScale?: number;
  colorMode?: number;
  onMinDistance?: (distance: number) => void;
  onCameraSize?: (size: { width: number; height: number }) => void;
  onError?: () => void;
  onReady?: () => void;
  onPause?: () => void;
}

interface NativeMethods {
  takePicture: () => Promise<void>;
}

export type DepthCameraViewRef = PureComponent<DepthCameraViewProps> & NativeMethods;

export class DepthCameraView extends PureComponent<DepthCameraViewProps> {
  private readonly ref: React.RefObject<DepthCameraViewRef>;

  constructor(props: DepthCameraViewProps) {
    super(props);

    this.ref = createRef<DepthCameraViewRef>();
    this.onMinDistance = this.onMinDistance.bind(this);
    this.onCameraSize = this.onCameraSize.bind(this);
  }

  public takePicture = async (options?: TakePictureOptions) => {
    return await DepthCameraModule.takePicture(
      findNodeHandle(this.ref.current),
      options ?? { quality: 1 },
    );
  };

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
    return (
      <NativeDeptCameraView
        ref={this.ref}
        {...this.props}
        onMinDistance={this.onMinDistance}
        onCameraSize={this.onCameraSize}
      />
    );
  }
}

const NativeDeptCameraView = requireNativeComponent<DepthCameraViewProps>(
  'DepthCameraView',
  // @ts-expect-error because the type declarations are kinda wrong, no?
  DepthCameraView,
);
