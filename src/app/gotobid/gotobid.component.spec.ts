/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GotobidComponent } from './gotobid.component';

describe('GotobidComponent', () => {
  let component: GotobidComponent;
  let fixture: ComponentFixture<GotobidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GotobidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GotobidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
