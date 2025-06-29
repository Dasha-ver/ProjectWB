import React, {useState, useEffect} from 'react';
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import styles from './components.module.scss';

const RangeSlider = ({ min, max, value, step, onChange }) => {
    const [minValue, setMinValue] = useState(value ? value.min : min);
    const [maxValue, setMaxValue] = useState(value ? value.max : max);

    useEffect(() => {
        if (value) {
            setMinValue(value.min);
            setMaxValue(value.max);
        }
    }, [value]);

    const handleMinChange = e => {
        e.preventDefault();
        const newMinVal = Math.min(+e.target.value, maxValue - step);
        if (!value) setMinValue(newMinVal);
        onChange({ min: newMinVal, max: maxValue });
    };

    const handleMaxChange = e => {
        e.preventDefault();
        const newMaxVal = Math.max(+e.target.value, minValue + step);
        if (!value) setMaxValue(newMaxVal);
        onChange({ min: minValue, max: newMaxVal });
    };

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    return (
        <div class={styles.wrapper}>
          <div class={styles.input_wrapper}>
            <input
              class={styles.input}
              type="range"
              value={minValue}
              min={min}
              max={max}
              step={step}
              onChange={handleMinChange}
            />
            <input
              class={styles.input}
              type="range"
              value={maxValue}
              min={min}
              max={max}
              step={step}
              onChange={handleMaxChange}
            />
          </div>

          <div class={styles.control_wrapper}>
            <div class={styles.control} style={{ left: `${minPos}%` }} />
            <div class={styles.rail}>
              <div
                class={styles.inner_rail}
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
              />
            </div>
            <div class={styles.control} style={{ left: `${maxPos}%` }} />
          </div>
        </div>
    );
    };


export default RangeSlider;