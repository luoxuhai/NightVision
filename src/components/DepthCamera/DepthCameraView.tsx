import { PureComponent, createRef } from 'react';
import { requireNativeComponent, NativeModules, findNodeHandle, ViewStyle } from 'react-native';
import { DepthCameraRef } from './DepthCamera';

const DepthCameraModule = NativeModules.DepthCameraView;

interface TakePictureOptions {
  quality?: number;
}

interface DepthCameraViewProps {
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

type RefType = PureComponent<DepthCameraViewProps> & Readonly<DepthCameraRef>;

export class DepthCameraView extends PureComponent<DepthCameraViewProps> {
  private readonly ref: React.RefObject<RefType>;

  constructor(props: DepthCameraViewProps) {
    super(props);

    this.ref = createRef<RefType>();
    this.onMinDistance = this.onMinDistance.bind(this);
    this.onCameraSize = this.onCameraSize.bind(this);
  }

  public takePicture = async (options?: TakePictureOptions) => {
    return await DepthCameraModule.takePicture(options ?? {}, findNodeHandle(this.ref.current));
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
