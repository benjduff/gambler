/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GambleComponent } from './gamble.component';

describe('GambleComponent', () => {
  let component: GambleComponent;
  let fixture: ComponentFixture<GambleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GambleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GambleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
