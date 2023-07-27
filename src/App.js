import logo from './logo.svg';
import './App.css';
import Header from './component/Layout/Header';
import Footer from './component/Layout/Footer';
import Menuleft from './component/Layout/menuLeft';
import { Component } from 'react';
import { useLocation } from 'react-router-dom';
import Menuaccount from './component/Layout/Menuaccount';

function App(props) {
  let params1 = useLocation();
  // console.log(params1);
  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            {params1['pathname'].includes('account') ? (
              <Menuaccount />
            ) : (
              <Menuleft />
            )}
            {/* <Menuleft /> */}

            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
