import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  View,
} from "react-native";
import CameraRoll, {
  PhotoIdentifier,
} from "@react-native-community/cameraroll";
import { Header } from "./Header";
import _ from "lodash";
import { CameraRollItem } from "./CameraRollItem";
import { Preview } from "./Preview";
import {
  Transform,
  PageInfo,
  PickerProps,
  SelectedAssetsCropInfo,
} from "../types";

export function Picker(props: PickerProps) {
  const {
    nextTitle,
    backgroundColor,
    maxScale,
    multipleSelect: _multipleSelect,
    multipleSelectMaxItems = 10,
  } = props;
  const [assets, setAssets] = useState<PhotoIdentifier[]>([]);
  const [selectedAssetIndices, setSelectedAssetIndices] = useState<number[]>(
    []
  );
  const [selectedAssetsCropInfo, setSelectedAssetsCropInfo] = useState<
    SelectedAssetsCropInfo
  >({});
  const [nextPageInfo, setNextPageInfo] = useState<PageInfo | null>(null);
  const [previewItem, setPreviewItem] = useState<PhotoIdentifier | null>(null);
  const [previewItemIndex, setPreviewItemIndex] = useState<number>(0);
  const [multipleSelect, setMultipleSelect] = useState<boolean>(
    _multipleSelect
  );

  useEffect(() => {
    loadNextAssetPage();
  }, []);

  const loadNextAssetPage = useCallback(() => {
    if (nextPageInfo && !nextPageInfo.has_next_page) return;
    CameraRoll.getPhotos({
      assetType: "All",
      first: 20,
    }).then((results) => {
      const newAssets = _.chain(assets)
        .concat(results.edges)
        .uniqWith(_.isEqual)
        .value();
      setAssets(newAssets);
      setNextPageInfo(results.page_info);
      if (!previewItem) {
        setPreviewItem(newAssets[0]);
        setPreviewItemIndex(0);
        setSelectedAssetIndices([0]);
      }
    });
  }, [assets, nextPageInfo]);

  const handleCropParamsChanged = useCallback(
    (params: Transform, index: number) => {
      setSelectedAssetsCropInfo({
        ...selectedAssetsCropInfo,
        [index]: params,
      });
    },
    [previewItemIndex]
  );

  const toggleItemSelected = useCallback(
    (item, index) => {
      if (!multipleSelect) {
        setSelectedAssetIndices([index]);
        showItemPreview(item, index);
        return;
      }

      if (
        selectedAssetIndices.length >= multipleSelectMaxItems &&
        previewItemIndex !== index &&
        selectedAssetIndices.includes(index)
      ) {
        // max items selected, just show this one
        showItemPreview(item, index);
      } else if (
        previewItemIndex === index &&
        selectedAssetIndices.includes(index) &&
        selectedAssetIndices.length > 1
      ) {
        // de-select selected item. items must be selected and previewed before they are removed.
        const newSelectedIndices = _.pull(selectedAssetIndices, index);
        let previousItemIndex =
          newSelectedIndices[newSelectedIndices.length - 1];
        let previousItem = assets[previousItemIndex];
        showItemPreview(previousItem, previousItemIndex);
        setSelectedAssetIndices(newSelectedIndices);
        delete selectedAssetsCropInfo[index];
        setSelectedAssetsCropInfo(selectedAssetsCropInfo);
      } else if (
        previewItemIndex !== index &&
        selectedAssetIndices.includes(index)
      ) {
        // item selected but not showing in preview, just show it in the preview. if item tapped again, it will be removed.
        showItemPreview(item, index);
      } else if (
        !selectedAssetIndices.includes(index) &&
        selectedAssetIndices.length < multipleSelectMaxItems
      ) {
        // select unselected item
        showItemPreview(item, index);
        setSelectedAssetIndices(selectedAssetIndices.concat(index));
      }
    },
    [selectedAssetIndices, previewItemIndex]
  );

  const showItemPreview = useCallback((item, index) => {
    setPreviewItem(item);
    setPreviewItemIndex(index);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={[styles.header, { backgroundColor }]}>
        <Header nextTitle={nextTitle} />
      </SafeAreaView>
      <View style={styles.previewContainer}>
        <Preview
          item={previewItem}
          itemIndex={previewItemIndex}
          maxScale={maxScale}
          transform={selectedAssetsCropInfo[previewItemIndex]}
          onCropParamsChanged={handleCropParamsChanged}
        />
      </View>
      <FlatList
        style={[styles.listContainer, { backgroundColor }]}
        data={assets.slice()}
        columnWrapperStyle={styles.listColumnWrapperStyle}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <CameraRollItem
            item={item}
            index={index}
            multipleSelect={multipleSelect}
            selected={selectedAssetIndices.includes(index)}
            selectionCount={
              selectedAssetIndices.includes(index)
                ? selectedAssetIndices.indexOf(index) + 1
                : null
            }
            toggleItemSelected={toggleItemSelected}
          />
        )}
        numColumns={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  header: {
    zIndex: 100,
  } as ViewStyle,
  previewContainer: {
    zIndex: 50,
  } as ViewStyle,
  listContainer: {
    zIndex: 100,
  } as ViewStyle,
  listColumnWrapperStyle: {
    justifyContent: "space-between",
  } as ViewStyle,
});
