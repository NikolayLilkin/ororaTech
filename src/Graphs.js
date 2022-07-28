import React, { Component } from 'react';
import './graphs.css'
import Diagramhotspot from './Diagramhotspot.js';
import DiagramAge from './DiagramAge';
class Graphs extends Component {
    constructor() {
        super();
        this.state = {
           currentGraph: 'Hotspot count',
           color: '#cb471f'
        };
        this.changeGraph = this.changeGraph.bind(this);
    }
    changeGraph(s) {
        if(s === "Age per Cluster" && this.state.currentGraph === 'Hotspot count'){
            this.setState({currentGraph:'Age per Cluster', color:'#69b3a2'});
            return;
        }
        if(s === "Hotspot count" && this.state.currentGraph === 'Age per Cluster'){
            this.setState({currentGraph:'Hotspot count',color: '#cb471f'});
            return;
        }
    }
    render() {
      return (
        <div>
        <div className='flex'>
            <div className="dropdown">
                <button className="dropbtn" style={{backgroundColor: this.state.color}}>{this.state.currentGraph}</button>
                <div className="dropdown-content">
                    <p onClick={() => this.changeGraph("Age per Cluster")}>Age per Cluster</p>
                    <p onClick={() => this.changeGraph("Hotspot count")}>Hotspot count</p>
                </div>
            </div>
            <h4>
                {this.state.currentGraph}
            </h4>
        </div>
        {this.state.currentGraph === 'Hotspot count' ? <Diagramhotspot/> : <DiagramAge/>}
        </div>
      );
    }
}
export {Graphs}; 
