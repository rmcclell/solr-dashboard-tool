import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { Item, DataService } from '../../../data.service';

import * as d3 from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {

  @Input() id: number;
  @Input() description: string;
  @Input() title: string;
// get height(): number { return parseInt(d3.select('body').style('height'), 10); }
// get width(): number { return parseInt(d3.select('body').style('width'), 10); }

  get height(): number { return 300; }
  get width(): number { return 320; }
  radius: number;
  // Arcs & pie
  private arc: any;  private pie: any;  private slices: any;
  private color: any;
  // Drawing containers
  private svg: any;  private mainContainer: any;
  private tooltip: any;  private total: number;
  private arcLabel: any;
  private texts: any;
  // Data
  dataSource: Item[];

  constructor(private service: DataService) {
    this.dataSource = this.service.getData();
    this.total = this.dataSource.reduce((sum, it) => sum += it.abs, 0);
  }

  ngOnInit() {
    this.svg = d3.select('#pie-' + this.id).select('svg');
    this.setSVGDimensions();
    this.color = scaleOrdinal(schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3Shape.pie().sort(null).value((d: any) => d.abs);
    this.draw();
    window.addEventListener('resize', this.resize.bind(this));

    this.tooltip = d3.select('#pie-' + this.id)
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none')
      .style('opacity', 0);
  }
  private resize() {
    this.setSVGDimensions();
    this.setArcs();
    this.repaint();
  }

  private repaint() {
    this.drawSlices();
    this.drawLabels();

  }

  private setSVGDimensions() {
    this.radius = (Math.min(this.width, this.height)) / 2;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', `translate(${this.radius},${this.radius})`);
  }

  private drawLabels() {
    this.texts = this.mainContainer.selectAll('text')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('text')
      .attr('text-anchor', 'middle').attr('transform', d => `translate(${this.arcLabel.centroid(d)})`).attr('dy', '0.35em');
    this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.05)
      .attr('x', 0).attr('y', 0).style('font-weight', 'bold')
      .text(d => d.data.name);
    this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.25)
      .attr('x', 0).attr('y', '1.3em').attr('fill-opacity', 0.7)
      .text(d => d.data.value);
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
    this.drawLabels();
  }

  private setArcs() {
    // this.arc = d3Shape.arc().outerRadius(this.radius).innerRadius(this.radius * .75);
    this.arc = d3Shape.arc().outerRadius(this.radius).innerRadius(0);
    this.arcLabel = d3Shape.arc().innerRadius(this.radius * .8).outerRadius(this.radius * .8);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.dataSource))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
      .attr('fill', (d, i) => this.color(i))
      .on('mousemove', function(s) {
        const percent = (Math.abs(s.data.abs / this.total) * 100).toFixed(2) + '%';
        this.tooltip.style('top', (d3.event.layerY + 15) + 'px').style('left', (d3.event.layerX + 15) + 'px')
          .style('display', 'block').style('opacity', 1).style('height', '40px');
        this.tooltip.html(`name: ${s.data.name}<br>value: ${s.data.value}<br>share: ${percent}`);
      }.bind(this))
      .on('mouseout', function() {
        this.tooltip.style('display', 'none').style('opacity', 0);
      }.bind(this));
  }
}
