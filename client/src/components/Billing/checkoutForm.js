import React from 'react'
import { CardElement } from "react-stripe-elements";

export default () => {
  return (
    <div>
      <CardElement style={{justifyContent: "center", base: {fontSize: '18px'}}} />
    </div>
  )
}
