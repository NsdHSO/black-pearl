import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarComponent } from './side-bar.component';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { importProvidersFrom } from '@angular/core';
import { IconCoreModule } from 'ngx-liburg-icon';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  describe('should be init ', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [SideBarComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(SideBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be empty', () => {
      const element = fixture.debugElement.nativeElement.querySelectorAll(
        '[data-test="synergy-side-bar-elements"]',
      );

      expect(element.length).toBe(0);
    });
  });
  describe('should change the state', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          SideBarComponent,
          RouterOutlet,
          MatIconModule,
          RouterLinkActive,
          RouterLink,
        ],
        providers: [
          { provide: ActivatedRoute, useValue: { data: {} } },
          importProvidersFrom(IconCoreModule),
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SideBarComponent);
      component = fixture.componentInstance;
      component.items = [
        {
          path: '',
          name: 'Dashboard',
          icon: 'fa_brands:jenkins',
        },
        {
          path: 'cow_heath',
          name: 'Cow Heath',
          icon: 'fa_brands:tumblr',
        },
      ];
      fixture.detectChanges();
    });
    it('should be 2 elements', () => {
      const element = fixture.debugElement.nativeElement.querySelectorAll(
        '[data-test="synergy-side-bar-elements"]',
      );

      expect(element.length).toBe(2);
    });
  });
});
