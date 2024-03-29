import { Injectable, Pipe, PipeTransform } from '@angular/core';
@Pipe({
   name: 'keyobject'
})
@Injectable()
export class Keyobject {

transform(value):any {
    let keys = [];
    for (let key in value) {
        keys.push({key: key, value: value[key]});
    }
    return keys;
}}