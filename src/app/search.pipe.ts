import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  /* first argument is item which have to be transformed */
  /* Second argument is based on which  transformation have to be done */

  transform(allPatients: any[], searchKey: string): any[] {
    const result: any = []

    if (!allPatients || searchKey == "") {
      return allPatients
    } else {
      allPatients.forEach((items: any) => {
        if (items.name.trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
          result.push(items)
        }
        

      })
    }
   return result;
  }

}
