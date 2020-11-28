import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restoreUser } from '../../store/session';
import { fetchGalleryImages } from '../../store/aws';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '85%',
    height: '85%',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function GalleryPage(props) {
  const user = useSelector(state => state.session.user);
  // const galleryId = props.match.params.id;
  const galleryImages = useSelector(state => state.files.galleryImages);
  const dispatch = useDispatch();
  const classes = useStyles();
  const galleryId = 1;

  useEffect(() => {
    dispatch(restoreUser(user))
  }, []);

  useEffect(() => {
    dispatch(fetchGalleryImages(galleryId))
  }, [galleryId, dispatch]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={5} className={classes.gridList} cols={4}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {galleryImages &&
          galleryImages.map((image) => (
            <GridListTile key={image.imageUrl}>
              <img src={image.imageUrl} alt={image.name} />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
}
