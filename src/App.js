import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  state = {
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar/>

        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
        />

        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} key="home" pagesize={9} country="in" category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pagesize={9} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pagesize={9} country="in" category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pagesize={9} country="in" category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pagesize={9} country="in" category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pagesize={9} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pagesize={9} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pagesize={9} country="in" category="technology"/>} />
        </Routes>

      </BrowserRouter>
      </>
    )
  }
}
