import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAttribute'
})
export class FilterByAttributePipe implements PipeTransform {

  transform(list: any[], term: any): any {
    if (!term) {
      return list;
    }

    if(list === undefined) return;

    return list.filter(x => (JSON.stringify(x)).toLowerCase().includes(term.toLowerCase()));
  }


}
