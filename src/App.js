import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm'
import Page from './Page';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // palettes: seedColors
      palettes: JSON.parse(window.localStorage.getItem("palettes")) || seedColors,
    };
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }
  savePalette(newPalette) {
    // this.setState(st => ({ palettes: [...this.state.palettes, newPalette] }), () => {
    //   window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
    // });
    this.setState(st => ({ palettes: [...this.state.palettes, newPalette] }),
      this.syncLocalStorage
    );
  }
  deletePalette(paletteId) {
    let newPalettes = this.state.palettes.filter(palette => palette.id !== paletteId);
    // this.setState(st => ({ palettes: newPalettes }), () => {
    //   window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
    // });
    this.setState(st => ({
      palettes: newPalettes,
      confirmDeleteShowing: false,
      deleteId: ''
    }),
      this.syncLocalStorage);
  }
  syncLocalStorage() {
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes))
  }
  render() {

    const FindPalette = (props) => {
      let params = useParams();
      let currentPalette = this.state.palettes.find(
        palette => palette.id === params.paletteId
      )
      return <Palette palette={generatePalette(currentPalette)} />
    }

    const FindSingleColorPalette = (props) => {
      let params = useParams();
      let currentPalette = this.state.palettes.find(
        palette => palette.id === params.paletteId
      )
      currentPalette = generatePalette(currentPalette);
      let currentColorPalette = []
      Object.keys(currentPalette.colors).map(
        colorLevel => {
          let currentColorLevel = currentPalette.colors[colorLevel].map(color => {
            if (color.id === params.colorId) {
              if (colorLevel != 50) { // remove the level 50 kermel ysiru l levels=9 wl goback tkun l 10e
                currentColorPalette.push(color)
              }
            }
          })
        })
      return <SingleColorPalette
        paletteName={currentPalette.paletteName} //hul li2an ana 3emle gher Colt bl videos 196/197
        emoji={currentPalette.emoji}
        paletteId={currentPalette.id}
        singleColorPalette={currentColorPalette}
      />
    }
    return (
        <Routes>
          <Route path="/" element={
            // <CSSTransition key={location.pathname} classNames='page' timeout={500}>
              <Page>
                <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} />
              </Page>
            // </CSSTransition>
          } />
          <Route path="/palette/:paletteId" element={
            // <CSSTransition key={location.pathname} classNames='page' timeout={500}>
              <Page>
                <FindPalette />
              </Page>
            // </CSSTransition>
          } />
          <Route path="/palette/:paletteId/:colorId" element={
            // <CSSTransition key={location.pathname} classNames='page' timeout={500}>
              <Page>
                <FindSingleColorPalette />
              </Page>
            // </CSSTransition>
          } />
          <Route path='/palette/new' element={
            // <CSSTransition key={location.pathname} classNames='page' timeout={500}>
              <Page>
                <NewPaletteForm maxColors={20} palettes={seedColors} savePalette={this.savePalette} />
                {/* we pass seedColors to this component cz aw2et ymkn mafi palettes in the state eza l user ma7ehun kellun */}
              </Page>
            // </CSSTransition>
          } />
          <Route path='*' element={
            // <CSSTransition key={location.pathname} classNames='page' timeout={500}>
              <Page>
                <PaletteList palettes={this.state.palettes} deletePalette={this.deletePalette} />
              </Page>
            // </CSSTransition>
          } />
        </Routes >
    );
  }
}
export default App;