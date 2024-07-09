import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainService } from '../../Services/Main/Main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild('mainDiv') mainDiv!: ElementRef;
  title = 'frontend_tfg';

  constructor(private mainService: MainService) {

  }

  ngAfterViewInit(): void {
    this.mainService.setMainDiv(this.mainDiv);
  }
}
