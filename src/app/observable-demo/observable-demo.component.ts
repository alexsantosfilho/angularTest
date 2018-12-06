import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable'
import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-observable-demo',
    templateUrl: './observable-demo.component.html',
    styleUrls: ['./observable-demo.component.css']
})
export class ObservableDemoComponent implements OnInit {
    private data: Observable<string>;
    fruits: Array<string> = [];
    anyErrors: boolean;
    finished: boolean;

    mathform: FormGroup;
    inputnumber: FormControl;
    squaredata: number;
    processed = false;
    apple = false;
    mango = false;
    orannge = false;

    constructor(private fb: FormBuilder) {

        this.inputnumber = new FormControl();

        this.mathform = fb.group({
        inputnumber : this.inputnumber
    })

        this.inputnumber.valueChanges.map(n=>n*n)
        .subscribe(power=>this.squaredata=power);

};
ngOnInit(){
}

start(){
    this.data = new Observable
(
    observer => 
    {
        setTimeout(() => 
        {
            observer.next('Apple');
            this.apple = true;
            }, 1000);
            
            setTimeout(() => 
            {
                observer.next('mango');
                this.mango = true;
            }, 2000);
            setTimeout(() => 
            {
                observer.next('Orannge');
                this.orannge = true;
            }, 3000);
            setTimeout(() => 
            {
                observer.error(new Error('error occured'));
            }, 4000);
            setTimeout(() => 
            {
                observer.complete();
            }, 5000);
    }
);

let subscription = this.data.
subscribe(fruit => this.fruits.push(fruit),
    error => this.anyErrors = true,
    () => this.finished = true
);

this.processed=true;

}

}