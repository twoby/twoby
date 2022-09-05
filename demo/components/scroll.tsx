const ScrollInto = ({
  children,
  selector,
  style = {},
  alignToTop = false,
  className = '',
  onClick,
}) => {
  const scrollIntoView = () => {
    const options = {
      behavior: 'smooth'
    }

    if (alignToTop) {
      options.block = 'start'
      options.inline = 'nearest'
    }

    const el = document.querySelector(selector)
    el.scrollIntoView(options)
  }

  const handleClick = (event) => {
    onClick(event)
    setTimeout(scrollIntoView, 1e3 / 60)
  }

  return (
    <div style={style} className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

export {
  ScrollInto
}
