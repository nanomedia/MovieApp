import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { MovieFilter } from '../shared/models/MovieFilter';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISearchContainer } from '../shared/models/SearchContainer';
import { ISearchMovie } from '../shared/models/SearchMovie';
import { BehaviorSubject } from 'rxjs';
import { ISearchPerson } from '../shared/models/SearchPerson';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  personsReadOnly = false;
  searchForm = new FormGroup({});
  movieContainer: ISearchContainer<ISearchMovie> = {};

  personResultSource = new BehaviorSubject<ISearchPerson[]>([]);
  personsResult$ = this.personResultSource.asObservable();
  constructor(private movieService: MovieService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createSearchForm();
    this.searchMovie();
  }

  get searchOption() {
    return [
      { value: '1', label: 'By tittle' },
      { value: '2', label: 'By actor / director' },
    ];
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      searchOption: ['1'],
      numberPage: [1],
      name: [null],
      personsFilter: [null],
      persons: [null],
      releaseDate: [null],
      releaseDateAfter: [null],
      releaseDateBefore: [null],
    });
  }
  private getfilterFromForm(): MovieFilter {
    const {
      name,
      persons,
      releaseDateAfter,
      releaseDateBefore,
      numberPage,
    } = this.searchForm.value;

    return {
      name,
      persons,
      releaseDateAfter,
      releaseDateBefore,
      numberPage,
    };
  }

  searchMovie() {
    const filter = this.getfilterFromForm();
    this.movieService.searchMovie(filter).subscribe((response) => {
      this.movieContainer = response;
      console.log(response);
    });
  }

  onPersonSelect(person: any) {
    if (person.item.id) {
      this.personsReadOnly = !this.personsReadOnly;
      this.searchForm.controls.persons.setValue(person.item.id.toString());
    }
  }

  changeTypeaheadLoading(event: boolean) {
    if (event) {
      const form = this.searchForm.value;
      if (form.personsFilter.length > 3) {
        this.movieService
          .searchPersonByName(form.personsFilter)
          .subscribe((response) => {
            this.personResultSource.next(response.results as ISearchPerson[]);
          });
      }
    }
  }
  get NumberPage(){
    return this.searchForm.value.numberPage;
  }

  cleanSearchFormControls(field?: string) {
    const formControls = this.searchForm.controls;
    if (field) {
      switch (field) {
        case 'name':
          formControls.name.setValue(null);
          break;
        case 'persons':
          this.personsReadOnly = !this.personsReadOnly;
          formControls.persons.setValue(null);
          formControls.personsFilter.setValue(null);
          break;
        case 'releaseDate':
          formControls.releaseDate.setValue(null);
          formControls.releaseDateAfter.setValue(null);
          formControls.releaseDateBefore.setValue(null);
          break;
      }
    } else {
      this.personsReadOnly = false;
      formControls.name.setValue(null);
      formControls.persons.setValue(null);
      formControls.personsFilter.setValue(null);
      formControls.releaseDate.setValue(null);
      formControls.releaseDateAfter.setValue(null);
      formControls.releaseDateBefore.setValue(null);
      formControls.numberPage.setValue(1);
      this.movieContainer = { };
    }
  }

  onOptionsSelected() {
    //this.cleanSearchFormControls();
  }

  setReleasedDates(dates: Date[]) {
    if (dates != undefined && dates.length == 2) {
      const formControls = this.searchForm.controls;
      formControls.releaseDateAfter.setValue(dates[0]);
      formControls.releaseDateBefore.setValue(dates[1]);
    }
  }

  onPageChanged(event: any) {
    const formControls = this.searchForm.controls;
    const numberPage = this.searchForm.value.numberPage;
    if (event.page != numberPage) {
      formControls.numberPage.setValue(event.page);
      this.searchMovie();
    }
  }
}
