import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegociomenuComponent } from './negociomenu.component';

describe('NegociomenuComponent', () => {
  let component: NegociomenuComponent;
  let fixture: ComponentFixture<NegociomenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegociomenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegociomenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
