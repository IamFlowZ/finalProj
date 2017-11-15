import { Injectable } from '@angular/core';

@Injectable()
export class Delay {
  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
}
}
