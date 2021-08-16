import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  offset: {
    marginTop: '2%',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(10),
  },
  root: {
    flexGrow: 1,
  },
}));