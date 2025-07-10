import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Curd } from './curd';

describe('Curd', () => {
  let component: Curd;
  let fixture: ComponentFixture<Curd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Curd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Curd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
