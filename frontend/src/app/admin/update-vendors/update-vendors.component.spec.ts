import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVendorsComponent } from './update-vendors.component';

describe('UpdateVendorsComponent', () => {
  let component: UpdateVendorsComponent;
  let fixture: ComponentFixture<UpdateVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
