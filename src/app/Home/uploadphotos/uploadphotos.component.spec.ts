/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UploadphotosComponent } from './uploadphotos.component';

describe('UploadphotosComponent', () => {
  let component: UploadphotosComponent;
  let fixture: ComponentFixture<UploadphotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadphotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadphotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
