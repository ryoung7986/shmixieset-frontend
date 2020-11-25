import { fetch } from './csrf';

export const UPLOAD_FILES = 'UPLOAD_FILES';

const uploadFiles = (files) => {
  return {
    type: UPLOAD_FILES,
    payload: files,
  }
}

export const submitFiles = (files) => async (dispatch) => {
  // console.log("files", files)
  try {
    if (!files) {
      throw new Error('Select files first!');
    }
    const formData = new FormData();
    formData.append('file', files[0]);
    const res = await fetch('api/gallery/test-upload', {
      method: "POST",
      body: formData,
    });
    dispatch(uploadFiles(res.data))
  } catch (error) {
    console.error(error)
  }
};

const initialState = { files: null };

const galleryReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPLOAD_FILES:
      newState = Object.assign({}, state);
      newState.files = action.files;
      return newState;
    default:
      return state
  }
};

export default galleryReducer;
