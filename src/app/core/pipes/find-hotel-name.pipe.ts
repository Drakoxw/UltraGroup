import { Pipe, PipeTransform } from '@angular/core';
import { HotelData } from '@interfaces/index';

@Pipe({
  name: 'findHotelName'
})
export class FindHotelNamePipe implements PipeTransform {

  transform(id: number, list: HotelData[]): string {
    let name = 'No found';
    list.forEach(el => {
      if (el.id === id) {
        name = el.name
      }
    })
    return name
  }

}
