import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAddressComponent } from './type-address.component';

describe('TypeAddressComponent', () => {
  let component: TypeAddressComponent;
  let fixture: ComponentFixture<TypeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
