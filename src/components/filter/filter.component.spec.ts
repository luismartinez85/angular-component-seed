import { inject, TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Load the implementations that should be tested
import {FilterComponent} from "./filter.component";
import {By} from "@angular/platform-browser";

describe('Filter Component', () => {

  let filterComp:FilterComponent;
  let fixture:ComponentFixture<FilterComponent>;

  // provide our implementations or mock-data to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        FilterComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    filterComp = fixture.componentInstance;

  });

  it('should emit on filter click', inject([], () => {

    let valueAfterClick;
    filterComp.searchTerm = 'testing';

    filterComp.filterButtonClicked.subscribe(terms => valueAfterClick = terms.value);
    fixture.nativeElement.querySelector('.filter__button').click();

    expect(valueAfterClick).toBe('testing');
  }));

  it('should emit on speak click', inject([], () => {

    let valueAfterClick;
    filterComp.searchTerm = 'testing';

    filterComp.phoneButtonClicked.subscribe(terms => valueAfterClick = terms.value);
    fixture.nativeElement.querySelector('.filter__input__speak').click();

    expect(valueAfterClick).toBe('testing');
  }));

  it('should emit on search term update', inject([], () => {

    let valueAfterUpdate;
    let input = fixture.debugElement.query(By.css('.filter__input__search')).nativeElement;

    filterComp.searchTermUpdated.subscribe(term => valueAfterUpdate = term.value);

    input.value = 'testing';

    fixture.detectChanges();
    fixture.whenStable().then( () =>{
        input.dispatchEvent(new Event('change'));

        expect(filterComp.searchTerm).toBe('testing');
        expect(valueAfterUpdate).toBe('testing');
    });
  }));
});
