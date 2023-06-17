import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitarBolsaComponent } from './DebitarBolsa.component';

describe('DebitarBolsaComponent', () => {
  let component: DebitarBolsaComponent;
  let fixture: ComponentFixture<DebitarBolsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitarBolsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitarBolsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
