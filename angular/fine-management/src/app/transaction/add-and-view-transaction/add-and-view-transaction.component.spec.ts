import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAndViewTransactionComponent } from './add-and-view-transaction.component';

describe('AddAndViewTransactionComponent', () => {
  let component: AddAndViewTransactionComponent;
  let fixture: ComponentFixture<AddAndViewTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAndViewTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAndViewTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
