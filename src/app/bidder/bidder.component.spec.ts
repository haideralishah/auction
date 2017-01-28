/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BidderComponent } from './bidder.component';

describe('BidderComponent', () => {
  let component: BidderComponent;
  let fixture: ComponentFixture<BidderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
