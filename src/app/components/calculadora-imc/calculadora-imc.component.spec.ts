import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculadoraImcComponent } from './calculadora-imc.component';

describe('CalculadoraImcComponent', () => {
  let component: CalculadoraImcComponent;
  let fixture: ComponentFixture<CalculadoraImcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculadoraImcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculadoraImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
