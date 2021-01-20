import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewsPage } from './previews.page';

describe('PreviewsPage', () => {
  let component: PreviewsPage;
  let fixture: ComponentFixture<PreviewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
