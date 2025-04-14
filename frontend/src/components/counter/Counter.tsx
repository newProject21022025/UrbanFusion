'use client';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { increment, decrement } from '../../redux/slices/counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.counter}>
      <button 
        className={styles.button}
        onClick={() => dispatch(decrement())}
        aria-label="Decrement"
      >
        -
      </button>
      <span className={styles.value}>{count}</span>
      <button 
        className={styles.button}
        onClick={() => dispatch(increment())}
        aria-label="Increment"
      >
        +
      </button>
    </div>
  );
}