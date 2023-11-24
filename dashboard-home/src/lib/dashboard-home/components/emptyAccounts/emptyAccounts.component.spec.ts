import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyAccountsComponent } from './emptyAccounts.component';

describe('EmptyAccountsComponent', () => {
  let component: EmptyAccountsComponent;
  let fixture: ComponentFixture<EmptyAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyAccountsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
