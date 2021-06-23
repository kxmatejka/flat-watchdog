import React, {FC} from 'react'
import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: 'Open Sans', sans-serif;
  }
`

const App: FC<{ Component: any, pageProps: any }> = ({Component, pageProps}) => {
  return (
    <>
      <GlobalStyle/>
      <Component {...pageProps} />
    </>
  )
}

export default App
