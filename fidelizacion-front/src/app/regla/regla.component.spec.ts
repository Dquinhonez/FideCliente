import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglaComponent } from './regla.component';

describe('ReglaComponent', () => {
  let component: ReglaComponent;
  let fixture: ComponentFixture<ReglaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
