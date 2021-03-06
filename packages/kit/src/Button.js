import React from 'react'
const { useState } = React
import './button.css'
import UIContext from './contexts/interface'
import { observer } from 'mobx-react-lite'

export default (({
  type,
  size,
  children,
  loadingText,
  onClick,
  ...props
}) => {
  const ui = React.useContext(UIContext)
  const [loading, setLoading] = React.useState(false)
  const [loadingMessage, setLoadingMessage] = React.useState()
  const [success, setSuccess] = React.useState(false)
  const [successMessage, setSuccessMessage] = React.useState()
  const [errored, setErrored] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState('Error!')
  const handleClick = async () => {
    if (typeof onClick !== 'function') return
    if (errored || success || loading) return
    const updateFunc = (newText) => setLoadingMessage(newText)
    try {
      setLoading(true)
      const res = onClick(updateFunc)
      if (typeof res === 'object' && typeof res.then === 'function') {
        const message = await res
        setLoading(false)
        setSuccessMessage(message ?? 'Success!')
        setSuccess(true)
        setTimeout(() => setSuccess(false), 2000)
      } else {
        setLoading(false)
      }
    } catch (err) {
      setErrored(true)
      setLoading(false)
      if (err.toString().startsWith('Error: Button: ')) {
        setErrorMessage(err.toString().replace('Error: Button: ', ''))
      } else {
        console.log(err)
        setErrorMessage('Error!')
      }
      setTimeout(() => setErrored(false), 3000)
    } finally {
      setLoadingMessage()
    }
  }
  return (
    <div className="button-outer">
      <div
        className={
          `
            button-inner
            ${type ?? 'outline'}
            ${size ?? 'normal'}
            ${errored ? 'error' : ''}
            ${success ? 'success' : ''}
            ${ui.modeCssClass}
          `
        }
        onClick={handleClick}
        {...props}
      >
        {errored ? errorMessage : undefined}
        {loading ? (loadingMessage ?? loadingText ?? 'Loading...') : undefined}
        {success ? successMessage ?? 'Success!' : undefined}
        {!errored && !loading && !success ? children : undefined}
      </div>
    </div>
  )
})
