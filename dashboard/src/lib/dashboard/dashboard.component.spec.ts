import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BreadcrumbComponent } from '../../../../synergy/src';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  describe('should have init value', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DashboardComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should have one instance of breadcrumb', () => {
      const element = fixture.debugElement.queryAll(
        By.directive(BreadcrumbComponent)
      );

      expect(element.length).toEqual(1);
    });
  });
});
