import React from "react";
// import './App.scss';
import styles from './App.module.css';
import test from './test.webp'; 
import Test2 from './test2.svg';

console.log(styles.body)
export default function App() {
	return (
		<div className={styles.body}>
			My app
			
			<Test2 />
			
			<img src={test} alt="img"/>
		</div>
	);
}
