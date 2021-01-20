import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MassegesPage } from './masseges.page';

describe('MassegesPage', () => {
  let component: MassegesPage;
  let fixture: ComponentFixture<MassegesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MassegesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MassegesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
