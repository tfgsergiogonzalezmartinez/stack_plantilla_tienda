import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../Services/User/User.service';

@Component({
  selector: 'app-HeaederElemento',
  templateUrl: './HeaederElemento.component.html',
  styleUrls: ['./HeaederElemento.component.css']
})
export class HeaederElementoComponent implements OnInit {
  @Input() Ruta : string = '';
  @Input() Rol : string = '';
  constructor(private router : Router, private userService : UserService) { }

  ngOnInit() {
  }



  goTo(){
    //quiero que vaya a home/ruta
    this.router.navigate(['home/'+this.Ruta]);
  }
}
