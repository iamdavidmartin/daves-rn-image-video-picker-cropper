import { PhotoIdentifier } from "@react-native-community/cameraroll";
import { ColorValue } from "react-native";

export interface PreviewProps {
  selected?: boolean;
  item: PhotoIdentifier | null;
  itemIndex: number;
  maxScale: number;
  transform: Transform;
  onCropParamsChanged: (params: Transform, index: number) => void;
}

export interface PickerProps {
  nextTitle: string;
  multipleSelect: boolean;
  backgroundColor: ColorValue;
  maxScale: number;
  multipleSelectMaxItems?: number;
}

export interface PageInfo {
  has_next_page: boolean;
  start_cursor?: string;
  end_cursor?: string;
}

export interface CameraRollItemProps {
  item: PhotoIdentifier;
  index: number;
  selected: boolean;
  selectionCount: number | null;
  multipleSelect: boolean;
  toggleItemSelected: (item: PhotoIdentifier, index: number) => void;
}

export interface SelectedAssetsCropInfo {
  [key: number]: Transform;
}

export interface Transform {
  scale: number;
  translateX: number;
  translateY: number;
}
