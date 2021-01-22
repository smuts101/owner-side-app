import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewWalkinsPage } from './view-walkins.page';

describe('ViewWalkinsPage', () => {
  let component: ViewWalkinsPage;
  let fixture: ComponentFixture<ViewWalkinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWalkinsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewWalkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
