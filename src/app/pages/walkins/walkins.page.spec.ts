import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WalkinsPage } from './walkins.page';

describe('WalkinsPage', () => {
  let component: WalkinsPage;
  let fixture: ComponentFixture<WalkinsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalkinsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WalkinsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
