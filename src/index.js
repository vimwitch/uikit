import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import './index.css'
import './colors.css'
import UIContext from './stores/interface'

const RootApp = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
)

ReactDOM.hydrate(<RootApp />, document.getElementById('root'))
