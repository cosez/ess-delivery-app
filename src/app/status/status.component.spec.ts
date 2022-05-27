import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusComponent } from './status.component';

describe('Describe the StatusComponent functionality', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('', () => {
    expect(component).toBeTruthy();
  });

  describe('A Parent component can', () => {
    describe('popup a fullscreen card', () => {
      it('can fill 80% of screen space', () => {

      });
      it('can disapear if a single button is pressed or the mouse', () => {

      });
      it('should have child components', () => {

      });
    })
    describe('show a description card', () => {
      it('can\'t show blank text', () => {

      });
      it('must show a order name, restaurant, status and client in the card', () => {

      });
      it('must show a button for the user to press and close the parent component and the child components', () => {

      });
      it('can\'t disappear if hovered', () => {

      });
    })
    describe('show a progress bar', () => {
      it('must never be 100%, at most 75%', () => {

      });
      it('must show a red color if order status is \'Rejected\' else a green color', () => {

      });
    })
  })

});
