import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UploadFile } from 'antd';

export interface ImageState {
  images: UploadFile[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imagesOptions: any;
}

export const initialState: ImageState = {
  images: [],
  imagesOptions: [],
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<UploadFile[]>) => {
      state.images = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setImagesOptions: (state, action: PayloadAction<any>) => {
      state.imagesOptions.push(action.payload);
    },
  },
});

export const { setImages, setImagesOptions } = imageSlice.actions;

export const imageReducer = imageSlice.reducer;
