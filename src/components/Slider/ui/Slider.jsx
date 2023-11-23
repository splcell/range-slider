import { useState, useCallback, useEffect, useRef} from "react";
import "./Slider.css";
import cn from "classnames";

export const Slider = ({ min, max }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);
  const range = useRef(null);
  

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValueRef.current  ) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxValueRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    if (minValueRef.current) {
      const minPercent = getPercent(+minValueRef.current.value);
      const maxPercent = getPercent(maxValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  const onChangeMinValue = useCallback(
    (e) => {
      const value = Math.min(+e.target.value, maxValue - 200);
      setMinValue(value);
      e.target.value = value.toString();
    },
    [maxValue]
  );

  const onChangeMaxValue = useCallback(
    (e) => {
        const value = Math.max(+e.target.value, minValue + 200);
        setMaxValue(value);
        e.target.value = value.toString();
    },
    [minValue]
  );

  const onChangeTextMin = useCallback(
    (e) => {
      if (e.target.value >= min && e.target.value <= max) {
        setMinValue(e.target.value);
      } else {
        setMinValue(min);
      }
    },
    [min, max]
  );

  const onChangeTextMax = useCallback(
    (e) => {
      if (e.target.value >= min && e.target.value <= max) {
        setMaxValue(e.target.value);
      } else {
        setMaxValue(max);
      }
    },
    [min, max]
  );

  const onBlurMin = useCallback(() => {
      setMinValue(min)
  }, [min])

  const onBlurMax = useCallback(() => {
    setMaxValue(max)
}, [max])

  return (
    <div className="container">
      <div className="inputs-inner">
        <input
          type="range"
          min={min}
          max={max}
          ref={minValueRef}
          value={minValue}
          onChange={onChangeMinValue}
          className={cn("thumb thumb--zindex-3", {
            "thumb--zindex-5": minValue > max - 100,
          })}
        />
        <input
          type="range"
          min={min}
          max={max}
          ref={maxValueRef}
          value={maxValue}
          onChange={onChangeMaxValue}
          className="thumb thumb--zindex-4"
        />
      </div>

      <div className="slider">
        <div className="slider-inputs">
          <div className="input-box">
            <input
            type="text"
            value={minValue}
            className="slider__left-value"
            onChange={onChangeTextMin}
            onBlur={onBlurMin}
          />
            <span className="ruble">&#8381;</span>
          </div>
          <div className="input-box">
            <input
            type="text"
            value={maxValue}
            className="slider__right-value"
            onChange={onChangeTextMax}
            onBlur={onBlurMax}
          />
            <span className="ruble">&#8381;</span>
          </div>
          
        </div>
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </div>
    </div>
  );
};
