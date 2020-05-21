// eslint-disable-next-line
import React, { useState } from "react";
// 逻辑可复用组件Toggle.js
const Toggle = ({ children }) => {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(prev => !prev)
  return children({on, toggle})
}

export default Toggle