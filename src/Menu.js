import {Control} from 'ol/control';
import './App.css';
class Menu extends Control {
    constructor(opt_options) {
      const options = opt_options || {};
      //Creating the buttons
      const labelVisibility = document.createElement('button');
      labelVisibility.innerHTML = 'V';
      const buttonWidget = document.createElement('button');
      buttonWidget.innerHTML = 'W';
      const buttonDiagram = document.createElement('button');
      buttonDiagram.innerHTML = 'D';
      const element = document.createElement('div');
      element.className = 'menu ol-unselectable ol-control';
      element.appendChild(labelVisibility);
      element.appendChild(buttonWidget);
      element.appendChild(buttonDiagram);
      super({
        element: element,
        target: options.target,
      });
      //Adding functionality to the buttons 
      labelVisibility.addEventListener('click', this.handleVisibiliy.bind(this), false);
      buttonDiagram.addEventListener('click', this.handleDiagram.bind(this), false);
      buttonWidget.addEventListener('click',this.handleWidget.bind(this),false);
    }
    handleWidgetVisibility(){
      const container = document.getElementById('widget');
      container.style.visibility = 'hidden';
    }
    handleWidget(){
      const container = document.getElementById('widget');
      if(container.style.visibility === 'hidden'){
        container.style.visibility = 'visible'
        const widgetCloser = document.getElementById('widget-closer');
        widgetCloser.addEventListener('click', this.handleWidgetVisibility.bind(this), false);
      }
      else{
        container.style.visibility = 'hidden';
      }
    }
    handleVisibiliy() {
        let bool=this.getMap().getLayers().getArray()[1].getVisible();
        this.getMap().getLayers().getArray()[1].setVisible(!bool);
    }
    handleDiagramVisibility() {
      const container = document.getElementById('diagram');
      container.style.visibility = 'hidden';
  }
    handleDiagram(){
      const container = document.getElementById('diagram');
      if(container.style.visibility === 'hidden'){
        container.style.visibility = 'visible'
        const widgetCloser = document.getElementById('diagram-closer');
        widgetCloser.addEventListener('click', this.handleDiagramVisibility.bind(this), false);
      }
      else{
        container.style.visibility = 'hidden';
      }
    }
}
export {Menu};