import { Component } from '@angular/core';

import { ConvertorEventsService } from './convertor-events.service';
import { FirebaseService } from './firebase.service';

@Component({
    selector: 'formattedNumber',
    templateUrl: './formattedNumber.component.html',
    styleUrls: ['./formattedNumber.component.css']
})
export class FormattedNumberComponent {

  private formattedString:string = '';

  constructor(events:ConvertorEventsService, public firebaseService: FirebaseService) {
    events.getSubject()
      .subscribe( this.formatNumber.bind(this),  this.errorNumber.bind(this));
  }

  formatNumber(inputValue:number):void {
    console.log('inputValue ' + inputValue);
    this.formattedString = this.convertNumberToWords(inputValue);
    this.saveToDB(inputValue,this.formattedString);
  }

  saveToDB(value:number, fString:string):void{
    this.firebaseService.createNewRecord(value, fString);
  }

  errorNumber(inputValue:number):void{
    this.formattedString = 'Incorrect Number';
  }

  getFormattedString():string {
    return this.formattedString;
  }

  convertNumberToWords(n:number) {
    const arr = x => Array.from(x);
    const num = x => Number(x) || 0;
    const str = x => String(x);
    const isEmpty = xs => xs.length === 0;
    const take = n => xs => xs.slice(0,n);
    const drop = n => xs => xs.slice(n);
    const reverse = xs => xs.slice(0).reverse();
    const comp = f => g => x => f (g (x));
    const not = x => !x;
    const chunk = n => xs => isEmpty(xs) ? [] : [take(n)(xs), ...chunk (n) (drop (n) (xs))];

    let numToWords = n => {
      
      let a = [
        '', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
      ];
      
      let b = [
        '', '', 'twenty', 'thirty', 'forty',
        'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
      ];
      
      let g = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
      ];

      let makeGroup = ([ones,tens,huns]) => {
        return [
          num(huns) === 0 ? '' : a[huns] + ' hundred ',
          num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
          a[tens + ones] || a[ones]
        ].join('');
      };
      
      let thousand = (group,i) => group === '' ? group : `${group} ${g[i]}`;
      
      if (typeof n === 'number')
        return numToWords(String(n));
      else if (n === '0')
        return 'zero';
      else
        return comp (chunk(3)) (reverse) (arr(n))
          .map(makeGroup)
          .map(thousand)
          .filter(comp(not)(isEmpty))
          .reverse()
          .join(' ');
    };
    console.log(numToWords(n));
    
    return numToWords(n);

  }



}
