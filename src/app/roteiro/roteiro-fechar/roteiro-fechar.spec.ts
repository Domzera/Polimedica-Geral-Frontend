import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoteiroFechar } from './roteiro-fechar';

describe('RoteiroFechar', () => {
  let component: RoteiroFechar;
  let fixture: ComponentFixture<RoteiroFechar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoteiroFechar],
    }).compileComponents();

    fixture = TestBed.createComponent(RoteiroFechar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
