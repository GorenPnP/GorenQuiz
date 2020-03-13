import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileItemsComponent } from './file-items.component';

describe('FileItemsComponent', () => {
  let component: FileItemsComponent;
  let fixture: ComponentFixture<FileItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileItemsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
