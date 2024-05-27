import { useEffect, useRef, useState } from "react";

const SlideToggle = ({
  title,
  children,
  className,
  icon,
  duration = 300,
  close = true,
  index = 0,
  selected = null,
  setSelected = null,
}) => {
  const slideContent = useRef(null);
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(true);

  const setHeightNone = () => {
    if (!slideContent.current) return;

    slideContent.current.style.height = 0;
    slideContent.current.style.paddingTop = 0;
    slideContent.current.style.paddingBottom = 0;
    slideContent.current.style.marginTop = 0;
    slideContent.current.style.marginBottom = 0;
    slideContent.current.style.overflow = "hidden";
  };

  const setHeightAuto = (offsetHeight) => {
    if (!slideContent.current) return;

    slideContent.current.style.transitionProperty = "height, margin, padding";
    slideContent.current.style.transitionDuration = duration + "ms";
    slideContent.current.style.boxSizing = "border-box";
    slideContent.current.style.height = height + "px";

    if (offsetHeight) slideContent.current.style.height = offsetHeight + "px";
  };

  const removeSpace = () => {
    if (!slideContent.current) return;

    slideContent.current.style.removeProperty("padding-top");
    slideContent.current.style.removeProperty("padding-bottom");
    slideContent.current.style.removeProperty("margin-top");
    slideContent.current.style.removeProperty("margin-bottom");
  };

  const removeProperty = () => {
    if (!slideContent.current) return;

    slideContent.current.style.removeProperty("overflow");
    slideContent.current.style.removeProperty("transition-duration");
    slideContent.current.style.removeProperty("height");
    slideContent.current.style.removeProperty("transition-property");
  };

  const slideUp = () => {
    setHeightNone();
    setOpen(false);
    setTimeout(() => {
      slideContent.current.style.display = "none";
      removeSpace();
      removeProperty();
    }, duration);
  };

  const slideDown = () => {
    slideContent.current.style.removeProperty("display");
    slideContent.current.style.display = "block";
    setHeightNone();
    slideContent.current.offsetHeight;
    setHeightAuto();

    removeSpace();
    setOpen(true);

    window.setTimeout(() => {
      removeSpace();
      removeProperty();
      setHeightAuto();
    }, duration);
  };

  const slideToggle = () => {
    if (open) return slideUp();
    slideDown();
    setSelected(index);
  };

  useEffect(() => {
    if (slideContent.current) {
      setOpen(!close);
      const offsetHeight = slideContent.current.offsetHeight;
      setHeight(offsetHeight);
      if (!close) return setHeightAuto(offsetHeight);
      setHeight(offsetHeight);
      slideContent.current.style.display = "none";
      setHeightNone();
      slideContent.current.style.removeProperty("height");
      setOpen(false);
    }
  }, [close]);

  useEffect(() => {
    if (index === selected) return slideDown();
    slideUp();
  }, [selected]);

  return (
    <div className={`slide-toggle select-none ${className}`}>
      <div
        className="slide-title flex cursor-pointer"
        onClick={() => {
          slideToggle();
        }}
      >
        {title}
        <div className="slide-arrow flex">
          <span
            className={`flex [transition:all_0.2s_ease-in-out] ${
              open && "rotate-180"
            }`}
          >
            {icon ? (
              icon
            ) : (
              <img
                src="/assets/icons/ic_expand_more.svg"
                className="filter brightness-0 invert"
              />
            )}
          </span>
        </div>
      </div>
      <div className="slide-content" ref={slideContent}>
        {children}
      </div>
    </div>
  );
};

export default SlideToggle;
