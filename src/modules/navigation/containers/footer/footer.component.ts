import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'sb-footer',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.scss'],
})
export class FooterComponent implements OnInit {
    constructor(
        private modalService: NgbModal
    ) {}
    ngOnInit() {}

    open(content: any) {
        this.modalService.open(content);
      }
}
