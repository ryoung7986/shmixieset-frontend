import { fetch } from './csrf';

export const CREATE_GALLERY = 'CREATE_GALLERY';
export const UPLOAD_FILES = 'UPLOAD_FILES';
export const FETCH_GALLERIES = 'FETCH_GALLERIES';
export const SET_GALLERIES = 'SET_GALLERIES';
export const SET_GALLERY = 'SET_GALLERY';
export const SET_GALLERY_IMAGES = 'SET_GALLERY_IMAGES';
export const SET_GALLERY_ID = 'SET_GALLERY_ID';
export const SET_COVER_IMAGE = 'SET_COVER_IMAGE';
export const ERASE_GALLERY = 'ERASE_GALLERY'

const uploadFiles = (files) => {
  return {
    type: UPLOAD_FILES,
    files,
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

const setGalleryId = (galleryId) => {
  return {
    type: SET_GALLERY_ID,
    galleryId
  }
};
const setGallery = (gallery) => {
  return {
    type: SET_GALLERY,
    gallery
  }
};

const eraseGallery = (galleryId) => {
  return {
    type: ERASE_GALLERY,
    galleryId
  }
}

const setCoverImage = (imageUrl) => {
  return {
    type: SET_COVER_IMAGE,
    imageUrl
  }
};

export const fetchGalleries = (userId) => async (dispatch) => {
  const res = await fetch(`/api/galleries/${userId}`);
  dispatch(setGalleries(res.data.galleries));
};

export const fetchGallery = (galleryId, userId) => async (dispatch) => {
  const gallery = await fetch(`/api/galleries/${userId}/${galleryId}`);
  dispatch(setGallery(gallery.data.gallery));
};

export const deleteGallery = (galleryId) => async (dispatch) => {
  const deletedGallery = await fetch(`/api/galleries/${galleryId}`, { method: "DELETE" });
  dispatch(eraseGallery(deletedGallery));
}

export const putCoverImage = (galleryId, imageUrl) => async (dispatch) => {
  const res = await fetch(`/api/galleries/${galleryId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ galleryId, imageUrl })
  })
  // dispatch(setCoverImage(res))
  console.log("PUT RES:", res)
  return res;
}

export const createGallery = (ownerId, galleryName, galleryPassword) => async (dispatch) => {
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
  dispatch(setGalleryId(res.data.gallery.id));
  return res;
};

export const fetchGalleryImages = (galleryId) => async (dispatch) => {
  const res = await fetch(`/api/images/${galleryId}`);
  console.log(res.data.galleryImages);
  dispatch(setGalleryImages(res.data.galleryImages));
}

export const submitFiles = (files, id) => async (dispatch) => {
  try {
    if (!files) {
      throw new Error('Select files first!');
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    };
    formData.append('id', id);
    for (let value of formData.values()) {
      console.log(value);
    }
    const res = await fetch('/api/aws', {
      method: "POST",
      body: formData
    });
    dispatch(uploadFiles(res.data));
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
    case SET_GALLERY_ID:
      newState = Object.assign({}, state);
      newState.galleryId = action.galleryId;
      return newState;
    case SET_GALLERY:
      newState = Object.assign({}, state);
      newState.gallery = action.gallery;
      return newState;
    default:
      return state
  }
};

export default galleryReducer;
