import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AttributeFamilyService } from '../attribute-family.service';
import { AttributesService } from '../attributes.service';

@Component({
  selector: 'sb-edit-attribute-family',
  templateUrl: './edit-attribute-family.component.html',
  styleUrls: ['./edit-attribute-family.component.scss']
})
export class EditAttributeFamilyComponent implements OnInit {

  editFamilyForm!: FormGroup;
  addGroup!: FormGroup
  public aData: any = [];
  public gData: any = []
  public length = 0;
  public total = 0;
  id: any
  showloader: any
  page = 1;
  groupId: any
  attrId: any

  get name() {
    return this.editFamilyForm.get('attribute_family_name');
  }

  get code() {
    return this.editFamilyForm.get('attribute_family_code');
  }

  get gName() {
    return this.editFamilyForm.get('gName');
  }

  get position() {
    return this.editFamilyForm.get('position');
  }

  get group_name() {
    return this.editFamilyForm.get('group_name');
  }

  constructor(private fb: FormBuilder,
    private attribute: AttributesService,
    private family: AttributeFamilyService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editFamilyForm = this.fb.group({
      attribute_family_code: ['', [Validators.required]],
      attribute_family_name: ['', [Validators.required]],
      // gName: ['', [Validators.required]],
      // position: ['', [Validators.required]]
    });

    this.addGroup = this.fb.group({
      group_name: ['', [Validators.required]]
    })
    this.getAttributesData()
    this.getGroup()

    this.id = this.route.snapshot.params.id
  }

  getAttributesData() {
    this.showloader = true
    this.attribute.getAttributesData(this.page).subscribe(result => {
      this.aData = result.Attributes.data;
      console.log(this.aData.group_id)
      this.length = result.Attributes.per_page;
      this.total = result.Attributes.total;
      // this.attrId = result.Attributes.data.group_id
      this.showloader = false
    });


  }

  getGroup() {
    this.family.getGroup().subscribe(result => {
      this.gData = result.Groups.data
      // this.groupId = result.Groups.data.id
    })
  }

  updateData(data: any) {
    this.family.editFamily(this.id, data).subscribe(data => {
      console.log('Data updated successfully! ', data)
    })
    this.router.navigate(['/catalog/products']);
  }

  updateData2(data: any) {
    this.family.addGroup(data).subscribe(data => {
      console.log('Data added successfully! ', data)
    })
  }

  deleteRow(id: number) {
    this.attribute.deleteAttribute(id).subscribe(data => {
      this.getAttributesData();
    });
    console.log('Deleted!');
  }

  deleteGroup(id: number) {
    this.family.deleteGroup(id).subscribe(data => {
      this.getGroup();
    });
    console.log('Group deleted')
  }

  onClick() {

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

}
