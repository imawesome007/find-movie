import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchStr: string): any {
    if (value.length === 0 || searchStr === '') {
      return value;
    }
    const resultArray = [];
    console.log(searchStr);

    for (const item of value) {
      console.log(item);
      console.log(item["title"]);
      if (item["title"].toLowerCase().includes(searchStr)) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
