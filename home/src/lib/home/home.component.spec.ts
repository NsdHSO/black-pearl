import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {provideMockStore} from "@ngrx/store/testing";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
          provideMockStore()
      ]
    }).compileComponents();


  });

  it('should create', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should not have touched', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("[data-test='control']")
    expect(input.classList).toContain('ng-valid')
  });
  it('should not have touched', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.name.setValue('ivan')
    fixture.detectChanges();
    const input: HTMLInputElement = fixture.nativeElement.querySelector("[data-test='control']")
    expect(input.classList).toContain('ng-untouched')
    expect(input.value).toContain("ivan")
  });
  it('should be pristine', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.name.setValue('ivan')
    const input: HTMLInputElement = fixture.nativeElement.querySelector("[data-test='control']")
    input.value ="Ivan"
    input.dispatchEvent(new Event('input'))
    input.dispatchEvent(new Event('blur'))
    fixture.detectChanges()
    expect(input.classList).toContain("ng-dirty")
    expect(input.value).toEqual('Ivan')
  })
});
