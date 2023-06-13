import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-demo';
  data=[
    {
      title:'测试一',
      list:[
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的'
      ]
    },
    {
      title:'测试二',
      list:[
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的',
        '我是最帅的'
      ]
    }
  ]
}
