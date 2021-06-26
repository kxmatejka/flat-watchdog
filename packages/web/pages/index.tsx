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
import {Offers} from '../src/components/offers/offers'

const StyledHeading = styled.h1`
  color: #282828;
`

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
`

const Map = styled.img`
  width: 100%;
`

const Filter = () => {
  return (
    <div>
      <div>
        <FormControl>
          <FormLabel component='legend'>Source:</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={false} onChange={() => null} name='ulovdomov.cz'/>}
              label='ulovdomov.cz'
            />
          </FormGroup>
        </FormControl>
      </div>
      <div>
        <Typography id='range-slider' gutterBottom>
          Price:
        </Typography>
        <Slider
          value={[20, 50]}
          onChange={() => null}
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          getAriaValueText={() => '77'}
        />
      </div>
      <div>
        <FormControl style={{width: '150px'}}>
          <InputLabel id="demo-simple-select-label">Order by date:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={1}
            onChange={() => null}
          >
            <MenuItem value={1}>Asc</MenuItem>
            <MenuItem value={2}>Desc</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl style={{width: '150px'}}>
          <InputLabel id="demo-simple-select-label">Order by price:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={1}
            onChange={() => null}
          >
            <MenuItem value={1}>Asc</MenuItem>
            <MenuItem value={2}>Desc</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}



export default function Home() {
  return (
    <Container>
      <Box>
        <StyledHeading>Flat Watchdog</StyledHeading>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Map src='/maps.jpg' alt='map'/>
        </Grid>
        <Grid item xs={4}>
          <Filter/>
          <Offers/>
        </Grid>
      </Grid>
    </Container>
  )
}
