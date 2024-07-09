import { AfterViewInit, Component, DestroyRef, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('modal') modalRef! : ElementRef;
  @Output() exitEventEmitter : EventEmitter<void> = new EventEmitter<void>();
  private clickFondoListener!: () => void;
  private primeraVez : boolean = true;
  constructor(private renderer2 : Renderer2) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.clickFondoListener();
  }

  ngAfterViewInit(): void {
    this.clickFondoListener = this.renderer2.listen('document', 'click', (event) => {
      this.clickFuera(event);
    });
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  closeModal(){

    this.exitEventEmitter.emit();
  }

  clickFuera(event: any){
    if (this.primeraVez){
      this.primeraVez = false;
      return;
    }
    if (!this.modalRef.nativeElement.contains(event.target)){
      this.closeModal();
    }
  }



}
