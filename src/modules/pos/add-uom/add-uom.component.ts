import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sb-add-uom',
  templateUrl: './add-uom.component.html',
  styleUrls: ['./add-uom.component.scss']
})
export class AddUomComponent implements OnInit {

  addUomForm!: FormGroup

  get name() {
    return this.addUomForm.get('name');
  }

  get unit() {
    return this.addUomForm.get('unit');
  }

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addUomForm = this.fb.group({
      name: ['', [Validators.required]],
      unit: ['', [Validators.required]]
    })
  }

  onSubmit(data: any) {
    // this.userService
    //   .postUserData(data)
    //   .subscribe((result: any) => console.log(result));
    console.log('Form Submitted', (data));
    this.router.navigate(['/pos/uom']);
  }

}


