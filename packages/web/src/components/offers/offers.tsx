import styled from 'styled-components'
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const ShrinkItem = styled(Grid)`
  flex-grow: 0;
`

const GrowItem = styled(Grid)`
  flex-grow: 1;
`

const RightAlign = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ScrollContainer = styled.div`
  overflow-y: scroll;
  height: 500px;
`

const OfferContainer = styled.div`
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;

  color: #444;
`

const Title = styled.h2`
  font-size: 1.2rem;
  padding: 0;
  margin: 0;
`

const Offer = () => {
  return (
    <OfferContainer>
      <Title>Na drážce blalala</Title>
      <Grid container justify='space-between'>
        <ShrinkItem item>
          1 hour ago&nbsp;|&nbsp;
        </ShrinkItem>
        <ShrinkItem item>
          14 000,-
        </ShrinkItem>
        <GrowItem item>
          <RightAlign>
            <PhotoLibraryIcon
              style={{cursor: 'pointer'}}
              onClick={() => null}
            />
          </RightAlign>
        </GrowItem>
      </Grid>
    </OfferContainer>
  )
}

export const Offers = () => {
  return (
    <ScrollContainer>
      <Offer/>
      <Offer/>
      <Offer/>
      <Offer/>
      <Offer/>
      <Offer/>
      <Offer/>
      <Offer/>
    </ScrollContainer>
  )
}