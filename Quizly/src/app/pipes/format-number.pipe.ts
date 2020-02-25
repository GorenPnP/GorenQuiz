import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
registerLocaleData(localeDE);

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    return formatNumber(value, 'de-DE');
  }
}
