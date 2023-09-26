import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: RatingComponent,
        multi: true
    }
]
})
export class RatingComponent implements OnInit {

 
  ngOnInit(): void {
    this.rating = this.rating || 3; //default after input`s initialization
    for(var i=0; i < this.maxRating; i++) {
      this.iconsArray.push(i);
    }
  }

  public readonly eventInfo = (()=>{
    const id =new Date().getTime();
    const topic = `star-rating:${id}:changed`;
    return { 
      topic 
    }
  })();

  private _rating : number;
  private onChange : any;
  private onTouched : any;
  public disabled : boolean;

  writeValue(obj: number): void {
    this.rating = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled ? "true" : "false";
  }

  @Input() public set rating(val : any){
    this._rating = val;
    // for form
    if(this.onChange){
      this.onChange(val);
    }
  }

  public get rating(): any{
    return this._rating;
  }
  
  @Output()
  ratingChanged : EventEmitter<number> = new EventEmitter<number>();

  @Input()
  readonly: string = "false";
  @Input()
  activeColor : string = '#ff8504';
  @Input()
  defaultColor : string = '#aaaaaa';
  @Input()
  activeIcon : string = 'star';
  @Input()
  defaultIcon : string = 'star-outline';
  @Input()
  halfIcon : string = 'star-half';
  @Input()
  halfStar : string = "false";
  @Input()
  maxRating : number = 5;
  @Input()
  fontSize : string = '18px';
  Math: any;
  parseFloat : any;
  iconsArray : number[] = [];

  constructor() {
    this.Math = Math;
    this.parseFloat = parseFloat;
  }

  changeRating(event){

    if(this.readonly && this.readonly === "true") return;
    // event is different for firefox and chrome
    let id = event.target.id ? parseInt(event.target.id) : parseInt(event.target.parentElement.id);
    if(this.halfStar && this.halfStar === "true") {
      this.rating = ((this.rating - id > 0) && (this.rating - id <= 0.5)) ? id + 1 : id + .5;
    } else {
      this.rating = id + 1;
    }
    this.ratingChanged.emit(this.rating)
  }

}
