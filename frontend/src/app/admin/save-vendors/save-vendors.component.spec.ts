import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveVendorsComponent } from './save-vendors.component';

describe('SaveVendorsComponent', () => {
  let component: SaveVendorsComponent;
  let fixture: ComponentFixture<SaveVendorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveVendorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveVendorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
