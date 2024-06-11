import React from 'react'
import logoComp from '../assets/logo.jpg';
function Logo({width = '100px'}) {
  return (
    <img src={logoComp} alt="Logo ALT" width={width} height={width} />
  )
}

export default Logo