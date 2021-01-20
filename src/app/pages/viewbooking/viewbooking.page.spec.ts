import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewbookingPage } from './viewbooking.page';

describe('ViewbookingPage', () => {
  let component: ViewbookingPage;
  let fixture: ComponentFixture<ViewbookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewbookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
