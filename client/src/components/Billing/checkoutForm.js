import React from 'react'
import { CardElement } from "react-stripe-elements";

export default () => {
  return (
    <div>
      <CardElement style={{base: {fontSize: '1.2rem'}}} />
    </div>
  )
}
