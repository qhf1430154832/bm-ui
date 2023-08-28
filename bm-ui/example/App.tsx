import React, { FC } from 'react';
import { sum } from 'utils/index';
import styles from './App.module.scss';

console.log('sum', sum(1, 2));
console.log('styles', styles);


interface Props {
  name: string;
}

const App:FC <Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.textRed} >{name}</div>
  );
}

export default App;
