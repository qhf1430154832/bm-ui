import React from "react";
import styles from './index.module.scss';
export default function Button () {
    return (
       <div>
         <button className={styles.button}>
            我是一个button
        </button>
       </div>
    )
}