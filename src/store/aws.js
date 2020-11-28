import { fetch } from './csrf';

export const CREATE_GALLERY = 'CREATE_GALLERY';
export const UPLOAD_FILES = 'UPLOAD_FILES';
export const FETCH_GALLERIES = 'FETCH_GALLERIES';
export const SET_GALLERIES = 'SET_GALLERIES';
export const SET_GALLERY_IMAGES = 'SET_GALLERY_IMAGES';
// export const SUBMIT_FILES = 'SUBMIT_FILES';

const uploadFiles = (files) => {
  return {
    type: UPLOAD_FILES,
    payload: files,
  };
};

const setGalleries = (galleries) => {
  return {
    type: SET_GALLERIES,
    galleries
  };
};

const setGalleryImages = (galleryImages) => {
  return {
    type: SET_GALLERY_IMAGES,
    galleryImages
  };
};

export const fetchGalleries = (userId) => async (dispatch) => {
  const res = await fetch(`/api/galleries/${userId}`);
  dispatch(setGalleries(res.data.galleries));
};

export const fetchGalleryImages = (galleryId) => async (dispatch) => {
  const res = await fetch(`/api/images/${galleryId}`);
  console.log("RESPONSE:", res.data);
  dispatch(setGalleryImages(res.data.galleryImages));
}

export const createGallery = (ownerId, galleryName, galleryPassword) => async () => {
  const res = await fetch('/api/galleries', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ownerId,
      galleryName,
      galleryPassword,
    })
  })
  return res;
};

export const submitFiles = (files) => async (dispatch) => {
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

const initialState = {};

const galleryReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case UPLOAD_FILES:
      newState = Object.assign({}, state);
      newState.files = action.files;
      return newState;
    case SET_GALLERIES:
      newState = Object.assign({}, state);
      newState.galleries = [...action.galleries];
      return newState;
    case SET_GALLERY_IMAGES:
      newState = Object.assign({}, state);
      newState.galleryImages = action.galleryImages;
      return newState;
    default:
      return state
  }
};

export default galleryReducer;
