import {useEffect, useState} from 'react'
import styled from 'styled-components'
import dynamic  from 'next/dynamic'
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
import {initializeApp, getApps} from 'firebase/app'
import {getFirestore, collection, getDocs, query, limit, useFirestoreEmulator} from 'firebase/firestore'
import {Offers} from '../src/components/offers/offers'

// @ts-ignore
const Map = dynamic(import('../src/components/map').then((module) => module.Map), {
  ssr: false
})

if (!getApps().length) {
  initializeApp({
    apiKey: 'AIzaSyAtTfUtkAZBacfjq6O31wksIQcCrc-FTyw',
    authDomain: 'flat-watchdog.firebaseapp.com',
    projectId: 'flat-watchdog',
    storageBucket: 'flat-watchdog.appspot.com',
    messagingSenderId: '532663141210',
    appId: '1:532663141210:web:7e5f91c288225028fee963',
    measurementId: 'G-E62C0CHN5F',
  })
}

const firestore = getFirestore()
// eslint-disable-next-line react-hooks/rules-of-hooks
useFirestoreEmulator(firestore, 'localhost', 8080)

const StyledHeading = styled.h1`
  color: #282828;
`

const Container = styled.div`
  max-width: 1100px;
  margin: auto;
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
          <InputLabel id='demo-simple-select-label'>Order by date:</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
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
          <InputLabel id='demo-simple-select-label'>Order by price:</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
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

interface Flat {
  externalId: string
  description: string
  url: string
  lat: number
  lng: number
  price: number
}

export default function Home() {
  const [flats, setFlats] = useState<Flat[]>([])

  useEffect(() => {
    const querySnapshot = getDocs(query(collection(firestore, 'flats'))).then((documents) => {
      setFlats(documents.docs.map((record) => {
        const data = record.data()
        return {
          externalId: data.externalId,
          description: data.description,
          url: data.url,
          lat: data.lat,
          lng: data.lng,
          price: data.price,
        }
      }))
    })
  }, [])

  return (
    <Container>
      <Box>
        <StyledHeading>Flat Watchdog</StyledHeading>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Map flats={flats}/>
        </Grid>
        <Grid item xs={4}>
          <Filter/>
          <Offers/>
        </Grid>
      </Grid>
    </Container>
  )
}
