import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAndNavBarComponent } from './side-and-nav-bar.component';

describe('SideAndNavBarComponent', () => {
  let component: SideAndNavBarComponent;
  let fixture: ComponentFixture<SideAndNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideAndNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideAndNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
