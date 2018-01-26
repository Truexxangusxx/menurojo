import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresamenuComponent } from './empresamenu.component';

describe('EmpresamenuComponent', () => {
  let component: EmpresamenuComponent;
  let fixture: ComponentFixture<EmpresamenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresamenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresamenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
