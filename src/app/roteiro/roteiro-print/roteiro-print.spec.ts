import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoteiroPrint } from './roteiro-print';

describe('RoteiroPrint', () => {
  let component: RoteiroPrint;
  let fixture: ComponentFixture<RoteiroPrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoteiroPrint],
    }).compileComponents();

    fixture = TestBed.createComponent(RoteiroPrint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
