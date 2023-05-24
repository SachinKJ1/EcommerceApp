import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(allItems: any[], searchKey: string, propertyname: string): any[] {
    const result: any = [];
    if (!allItems || searchKey == '' || propertyname == '') {
      return allItems;
    }
    allItems.forEach((items: any) => {
      if (
        items[propertyname]
          .trim()
          .toLowerCase()
          .includes(searchKey.trim().toLowerCase())
      ) {
        result.push(items);
      }
    });
    // if (!result.length) console.log('no');

    return result;
  }
}
