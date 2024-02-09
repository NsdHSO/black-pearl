import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuraComponent } from './aura.component';

describe('AuraComponent', () => {
  let component: AuraComponent;
  let fixture: ComponentFixture<AuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
