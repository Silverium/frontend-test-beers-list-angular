import { Pipe, PipeTransform } from '@angular/core';
/*
 * Filters collection of objects with prop name as a string.
 * Case is ignored.
 * Takes a name argument. If it's empty, returns collection
 * Usage:
 *   collection | filterByName:name
 * Example:
 *   {{ myArray | filterByName:"lager" }}
*/
@Pipe({name: 'filterByName'})
export class FilterByName implements PipeTransform {
  transform(collection: Array<any>, name: string): Array<any> {
    return collection.filter(element => {
   return name
    ? new RegExp(name, 'i').test(element.name)
    :true
    })
  }
}