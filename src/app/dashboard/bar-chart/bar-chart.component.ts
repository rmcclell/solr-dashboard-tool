import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { Item, DataService } from '../../data.service';

@Component({
  selector: 'app-bar-chart',
  template: '<div id="bar"><svg></svg></div>',
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  get height(): number { return 260; }
  get width(): number { return 260; }
  //get height(): number { return parseInt(d3.select('body').style('height'), 10); }
  //get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };
  get barWidth(): number { return this.width - this.margin.left - this.margin.right; }
  get barHeight(): number { return this.height - this.margin.top - this.margin.bottom; }
  // group containers (X axis, Y axis and bars)
  private gx: any; private gy: any; private bars: any;
  // Scales and Axis
  private xAxis: any;  private xScale: any;  private yAxis: any;  private yScale: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  // Data
  dataSource: Item[];

  constructor(private service: DataService) {
    this.dataSource = <Item[]>this.service.getData();
  }

  ngOnInit() {
    this.svg = d3.select('#bar').select('svg');
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    this.setSVGDimensions();
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    this.gy = this.mainContainer.append('g').attr('class', 'axis axis--y');
    this.gx = this.mainContainer.append('g').attr('class', 'axis axis--x');
    this.draw();
  }

  private drawBars() {
    this.bars = this.mainContainer.selectAll('.bar')
      .remove().exit()
      .data(this.dataSource).enter().append('rect');

    this.bars
      .attr('x', d => this.xScale(d.name))
      .attr('y', d => this.yScale(d.value))
      .attr('width', this.xScale.bandwidth())
      .attr('height', d => this.yScale(d.value) - this.yScale(0));
  }

  private drawAxis() {
    this.gy.attr('transform', 'translate(0, 0)').call(this.yAxis);
    this.gx.attr('transform', `translate(0, ${this.yScale(0)})`).call(this.xAxis);
  }

  private setSVGDimensions() {
    this.svg.style('width', this.width).style('height', this.height);
  }

  private setAxisScales() {
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();

    this.xScale
      .rangeRound([0, this.barWidth]).padding(.1)
      .domain(this.dataSource.map(d => d.name));
    this.yScale
      .range([this.barHeight, 0])
      .domain([0, Math.max(...this.dataSource.map(x => x.value))]);
    this.xAxis = d3.axisBottom(this.xScale);
    this.yAxis = d3.axisLeft(this.yScale);
  }

  private draw() {
    this.setAxisScales();
    this.drawAxis();
    this.drawBars();
  }
}