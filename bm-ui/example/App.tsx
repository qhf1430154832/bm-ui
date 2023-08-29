import React, { FC } from 'react';
import styles from './App.module.scss';
import { Button } from '../package/index'
console.log('styles', styles);


interface Props {
  name: string;
}

const App:FC <Props> = (props) => {
  const { name } = props;
  return (
    <div className={styles.textRed} >
      <Button></Button>
      {name}</div>
  );
}

export default App;
