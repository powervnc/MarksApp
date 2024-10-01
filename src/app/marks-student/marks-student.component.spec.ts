import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksStudentComponent } from './marks-student.component';

describe('MarksStudentComponent', () => {
  let component: MarksStudentComponent;
  let fixture: ComponentFixture<MarksStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarksStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarksStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
