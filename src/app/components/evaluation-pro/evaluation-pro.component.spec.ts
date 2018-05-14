import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationProComponent } from './evaluation-pro.component';

describe('EvaluationProComponent', () => {
  let component: EvaluationProComponent;
  let fixture: ComponentFixture<EvaluationProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
