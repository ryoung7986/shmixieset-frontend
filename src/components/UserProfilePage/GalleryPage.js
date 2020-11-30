import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { restoreUser } from '../../store/session';
import { fetchGalleryImages, fetchGallery } from '../../store/aws';
import { makeStyles, GridList, GridListTile, Grid } from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import * as awsActions from "../../store/aws";


const useStyles = makeStyles((theme) => ({
  rootNoCover: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
    marginTop: '50px',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  gridList: {
    width: '95%',
    height: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '5%',
  },
  modal: {
    width: '50%',
    height: '80%',
    boxShadow: theme.shadows[5],
    margin: '0 auto',
    marginTop: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  },
  paper: {
    width: '100%',
    height: '100%',
  },
}));

export default function GalleryPage(props) {
  const user = useSelector(state => state.session.user);
  const userId = useSelector(state => state.session.user.id);
  const galleryId = props.match.params.id;
  const gallery = useSelector(state => state.files.gallery);
  const galleryImages = useSelector(state => state.files.galleryImages);
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => {
    dispatch(restoreUser(user))
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchGalleryImages(galleryId))
    dispatch(fetchGallery(galleryId, userId))
  }, [dispatch, userId, galleryId]);

  const handleOpen = (e) => {
    setModalImage(e.target.src)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSetCoverImage = async (e) => {
    console.log(e.target.src)
    dispatch(awsActions.putCoverImage(galleryId, e.target.src))
    history.push('/');
  }

  let coverImageRender;
  if (gallery && !gallery.coverImage) {
    coverImageRender = (
      <Grid className={classes.rootNoCover}>
        <h1>Select your cover image</h1>
        <h3>Click on an image below:</h3>
        <div className={classes.root}>
          <GridList cellHeight={160} spacing={5} className={classes.gridListNoCover}>
            {galleryImages &&
              galleryImages.map((image) => (
                <GridListTile
                  key={image.imageUrl}
                  className={classes.imageTile}
                  onClick={handleSetCoverImage}
                  style={{
                    width: "300px",
                    height: "200px"
                  }}
                >
                  <img src={image.imageUrl} alt={image.name} />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </Grid >
    )
  } else {
    coverImageRender = (
      <>
        <div className={classes.root}>
          <GridList cellHeight={160} spacing={5} className={classes.gridList}>
            {galleryImages &&
              galleryImages.map((image) => (
                <GridListTile
                  key={image.imageUrl}
                  className={classes.imageTile}
                  onClick={handleOpen}
                  style={{
                    width: "300px",
                    height: "200px"
                  }}
                >
                  <img src={image.imageUrl} alt={image.name} />
                </GridListTile>
              ))}
          </GridList>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div
              className={classes.paper}
              style={{
                backgroundImage: `url(${modalImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          </Fade>
        </Modal>
      </>
    )
  }

  return (
    <>
      {coverImageRender}
    </>
  );
}


  // let subheader;
  // if (gallery && gallery.coverImage) {
  //   subheader = (
  //     <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
  //       <ListSubheader component="div">
  //         <h1>{gallery.name}</h1>
  //       </ListSubheader>
  //       {galleryImages &&
  //         galleryImages.map((image) => (
  //           <GridListTile
  //             key={image.imageUrl}
  //             cols={image.cols || 1}
  //             onClick={handleOpen}
  //           >
  //             <img src={image.imageUrl} alt={image.name} />
  //           </GridListTile>
  //         ))}
  //     </GridListTile>
  //   )
  // } else {
  //   subheader = (
  //     <GridListTile key="Subheader" cols={4}>
  //       <ListSubheader component="div">
  //         <h1>Select a cover image for your gallery! Click any image below to set your cover:</h1>
  //       </ListSubheader>
  //       <div className={classes.imageGrid}>
  //         {galleryImages &&
  //           galleryImages.map((image) => (
  //             <GridListTile
  //               key={image.imageUrl}
  //               cols={image.cols || 1}
  //               onClick={handleOpen}
  //               className={classes.imageTile}
  //             >
  //               <img src={image.imageUrl} alt={image.name} />
  //             </GridListTile>
  //           ))}
  //       </div>
  //     </GridListTile>
  //   )
  // }
