import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

const StyledHeading = styled.h1`
  color: red;
`

export default function Home() {
  return (
    <StyledHeading>Hello!</StyledHeading>
  )
}
