import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { Item, DataService } from '../../data.service';

import * as d3 from 'd3-selection';
import { scaleLinear, scaleTime, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-pie-chart',
  template: '<svg></svg>',
  styles: [
    `div.tooltip {
      position: absolute;
      text-align: center;
      width: 80px;
      height: 40px;
      padding: 5px;
      font: 12px sans-serif;
      background: black;
      color: white;
      border: 0px;
      border-radius: 8px;
      pointer-events: none;
      vertical-align: middle;
      z-index: 10;
    }`
  ],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

@Input() id: number; 
//get height(): number { return parseInt(d3.select('body').style('height'), 10); }
//get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  
  get height(): number { return 260; }
  get width(): number { return 260; }
  radius: number;
  // Arcs & pie
  private arc: any;  private pie: any;  private slices: any;
  private color: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  // Data
  dataSource: Item[];

  constructor(private service: DataService) {
    this.dataSource = this.service.getData();
  }

  ngOnInit() {
    this.svg = d3.select('svg');
    this.setSVGDimensions();
    this.color = scaleOrdinal(schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3Shape.pie().sort(null).value((d: any) => d.abs);
    this.draw();
    window.addEventListener('resize', this.resize.bind(this));
  }
  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
  }

  private repaint() {
    this.drawSlices();
  }

  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', `translate(${this.radius},${this.radius})`);
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
  }

  private setArcs() {
    this.arc = d3Shape.arc().outerRadius(this.radius).innerRadius(this.radius * .75);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
      .attr('fill', (d, i) => this.color(i));
  }
}