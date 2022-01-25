import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FineEntryComponent } from './fine-entry.component';

describe('FineEntryComponent', () => {
  let component: FineEntryComponent;
  let fixture: ComponentFixture<FineEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FineEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FineEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
