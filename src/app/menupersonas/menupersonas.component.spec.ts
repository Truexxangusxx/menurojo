import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenupersonasComponent } from './menupersonas.component';

describe('MenupersonasComponent', () => {
  let component: MenupersonasComponent;
  let fixture: ComponentFixture<MenupersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenupersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenupersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
