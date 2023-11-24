import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardHomeSkeletonComponent } from './dashboardHomeSkeleton.component';

describe('DashboardHomeSkeletonComponent', () => {
  let component: DashboardHomeSkeletonComponent;
  let fixture: ComponentFixture<DashboardHomeSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHomeSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardHomeSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
