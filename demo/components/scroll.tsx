import React from "react";
import { 
  useHref, useLinkClickHandler
} from "react-router-dom";

const Scroll = ({ onClick, selector, ...rest }) => {
  const scrollIntoView = () => {
    const options = {
      behavior: 'smooth',
      inline: 'nearest',
      block: 'start'
    }
    const el = document.querySelector(selector)
    el.scrollIntoView(options)
  }
  const handleClick = (event) => {
    onClick();
    scrollIntoView();
  }

  return (
    <div
      {...rest}
      onClick={handleClick}
    />
  );
}

const ScrollLink = React.forwardRef(
  function LinkWithRef(
    { onClick, reloadDocument, replace = false, state, target, to, selector, ...rest },
    ref
  ) {
    let href = useHref(to);
    let handleLink = useLinkClickHandler(to, { replace, state, target });
    const scrollIntoView = () => {
      const options = {
        behavior: 'smooth',
        inline: 'nearest',
        block: 'start'
      }
      const el = document.querySelector(selector)
      el.scrollIntoView(options)
    }
    const handleClick = (event) => {
      if (!event.defaultPrevented && !reloadDocument) {
        scrollIntoView();
        handleLink(event);
      }
    }

    return (
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        ref={ref}
        target={target}
      />
    );
  }
)

export {
  ScrollLink, Scroll
}
