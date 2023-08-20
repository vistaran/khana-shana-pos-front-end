import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '@modules/pos/user-data.service';
import { SettingsService } from '../settings.service';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sb-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

    settingsForm!: FormGroup;
    uploadedImage: any
    selectedFile: any
    shopDetails: any

    constructor(
        private fb: FormBuilder,
        private userService: UserDataService,
        private settingsService: SettingsService,
        private toast: AppToastService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.settingsForm = this.fb.group({
            shop_name: ['', [Validators.required]],
            logo: ['']
        })
        this.getshopDetails();
    }


    getshopDetails() {
        this.userService.getshopDetails().subscribe({
            next: (result: any) => {
                console.log(result.shop_name);
                if (result.shop_name) {
                    this.shopDetails = result;
                    this.settingsForm.patchValue({
                        shop_name: result.shop_name
                    });
                }
            },
        })
    }

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
        console.log(this.selectedFile);
    }


    updateShopDetails(data: any) {

        const settingsFormData = new FormData();
        settingsFormData.append('shop_name', data.shop_name ? data.shop_name : this.shopDetails.shop_name);

        if (this.selectedFile) {
            settingsFormData.append('logo', this.selectedFile, this.selectedFile.name);
        }

        console.log(settingsFormData, 'form');

        this.settingsService.updateShopDetails(settingsFormData).subscribe({
            next: (result: any) => {
                this.toast.success('Success', 'Shop details updated successfully.')
                if (result.shopDetails) {
                    localStorage.setItem('ShopDetails', JSON.stringify(result.shopDetails));
                    this.router.navigate(['/settings']);
                }
            },
            error: (error: any) => {

            }
        });
    }
}
