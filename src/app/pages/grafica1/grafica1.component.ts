import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels1 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [350, 450, 100],
  ];

  public labels2 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data2 = [
    [10, 50, 10],
  ];

  public labels3 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data3 = [
    [35, 480, 89],
  ];

  public labels4 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data4 = [
    [45, 78, 99],
  ];
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
