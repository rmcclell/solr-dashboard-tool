import { Component, OnInit, ViewEncapsulation, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Axis, AxisDomain, schemeCategory10, scaleOrdinal } from 'd3';

import { Item, DataService } from '../../../data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
  @Input() id: number;
  @Input() description: string;
  @Input() title: string;
  get height(): number { return 300; }
  get width(): number { return 320; }
  // get height(): number { return parseInt(d3.select('body').style('height'), 10); }
  // get width(): number { return parseInt(d3.select('body').style('width'), 10); }
  private margin = { top: 20, right: 20, bottom: 20, left: 20 };
  get barWidth(): number { return this.width - this.margin.left - this.margin.right; }
  get barHeight(): number { return this.height - this.margin.top - this.margin.bottom; }
   // group containers
   private gx: any; // X axis
   private gy: any; // Y axis
   private bars: any; // Bars
   private labels: any; // Labels

   // Scales and Axis
   private xAxis: Axis<AxisDomain>;
   private xScale: any;
   private yAxis: Axis<AxisDomain>;
   private yScale: any;
   private color: any;
   private tooltip: any;

   // Drawing containers
   private svg: any;
   private mainContainer: any;

   dataSource: Item[];
   total: number;

  constructor(private service: DataService) {
    this.dataSource = (this.service.getData() as Item[]);
    this.total = this.dataSource.reduce((sum, it) => sum += it.abs, 0);
  }

  ngOnInit() {
    this.svg = d3.select('#bar-' + this.id).select('svg');
    this.color = scaleOrdinal(schemeCategory10);
    this.xScale = d3.scaleBand();
    this.yScale = d3.scaleLinear();
    this.initSvg();

    this.tooltip = d3.select('#bar-' + this.id).select('.mat-card-content')
      .append('div')
      .attr('class', 'tooltip');
  }

  private initSvg() {
    this.setSVGDimensions();
    this.mainContainer = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.gy = this.mainContainer.append('g')
      .attr('class', 'axis axis--y');

    this.gx = this.mainContainer.append('g')
      .attr('class', 'axis axis--x');

    this.draw();
    window.addEventListener('resize', this.resize.bind(this));
  }

  private drawBars() {
    this.bars = this.mainContainer.selectAll('.bar')
      .remove()
      .exit()
      .data(this.dataSource)
      .enter().append('rect')
      .attr('class', (d: any) => d.value > 0 ? 'bar bar--positive' : 'bar bar--negative');

    this.bars
      .attr('x', d => this.xScale(d.name))
      .attr('y', this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .transition()
      .ease(d3.easeBounce)
      .duration(1000)
      .delay((d, i) => i * 80)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => Math.abs(this.yScale(d.value) - this.yScale(0)));

      this.bars
      .attr('fill', (d, i) => this.color(i))
      .on('mousemove', function(s) {
        const percent = (Math.abs(s.abs / this.total) * 100).toFixed(2) + '%';
        this.tooltip
          .style('top', (d3.event.layerY + 15) + 'px')
          .style('left', (d3.event.layerX + 15) + 'px')
          .style('display', 'block');
        this.tooltip.html(`Name: ${s.name}<br>Value: ${s.value}<br>Share: ${percent}`);
      }.bind(this))
      .on('mouseover', function(data, i, arr) {
         d3.select(arr[i]).style('stroke', 'black');
      }.bind(this))
      .on('mouseout', function(data, i, arr) {
        this.tooltip.style('display', 'none');
        d3.select(arr[i]).style('stroke', this.color(i));
      }.bind(this));
  }

  private drawAxis() {
    this.gy.attr('transform', `translate(0, 0)`).call(this.yAxis);
    this.gx.attr('transform', `translate(0, ${this.yScale(0)})`).call(this.xAxis);
  }

  private setSVGDimensions() {
    this.svg
      .style('width', this.width)
      .style('height', this.height);
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
    this.drawLabels();
  }

  resize() {
    this.setSVGDimensions();
    this.setAxisScales();
    this.repaint();
  }

  private repaint() {
    this.drawAxis();
    this.drawBars();
    this.drawLabels();
  }

  private drawLabels() {
    this.labels = this.mainContainer.selectAll('.label')
      .remove()
      .exit()
      .data(this.dataSource)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => this.xScale(d.name) + (this.xScale.bandwidth() / 2))
      .attr('y', d => this.yScale(d.value) + (d.value < 0 ? 15 : -5))
      .transition()
      .duration(1500)
      .delay((d, i) => 1000 + i * 100)
      .text(d => Math.floor(d.value));
  }
}
