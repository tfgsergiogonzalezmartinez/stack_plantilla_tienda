/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VentaService } from './Venta.service';

describe('Service: Venta', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VentaService]
    });
  });

  it('should ...', inject([VentaService], (service: VentaService) => {
    expect(service).toBeTruthy();
  }));
});
