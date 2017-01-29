/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GotoassuranceComponent } from './gotoassurance.component';

describe('GotoassuranceComponent', () => {
  let component: GotoassuranceComponent;
  let fixture: ComponentFixture<GotoassuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotoassuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoassuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
