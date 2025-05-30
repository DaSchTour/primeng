import { Code } from '@/domain/code';
import { PhotoService } from '@/service/photoservice';
import { Component, model, OnInit } from '@angular/core';

@Component({
    selector: 'custom-content-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Using <i>activeIndex</i>, Galleria is displayed with a specific initial image.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <div *ngIf="images() && images().length > 0" class="grid grid-cols-12 gap-4" style="max-width: 800px;">
                <div *ngFor="let image of images(); let index = index" class="col-span-4" key="index">
                    <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
                </div>
            </div>
            <p-galleria
                [(value)]="images"
                [(visible)]="displayCustom"
                [(activeIndex)]="activeIndex"
                [responsiveOptions]="responsiveOptions"
                [containerStyle]="{ 'max-width': '850px' }"
                [numVisible]="7"
                [circular]="true"
                [fullScreen]="true"
                [showItemNavigators]="true"
                [showThumbnails]="false"
            >
                <ng-template #item let-item>
                    <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
                </ng-template>
            </p-galleria>
        </div>
        <app-code [code]="code" selector="galleria-full-screen-template-demo"></app-code>
    `
})
export class CustomContentDoc implements OnInit {
    displayCustom: boolean | undefined;

    activeIndex: number = 0;

    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }

    code: Code = {
        basic: `<p-galleria [(value)]="images" [(visible)]="displayCustom" [(activeIndex)]="activeIndex" [responsiveOptions]="responsiveOptions" [containerStyle]="{ 'max-width': '850px' }" [numVisible]="7" [circular]="true" [fullScreen]="true" [showItemNavigators]="true" [showThumbnails]="false">
    <ng-template #item let-item>
        <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
    </ng-template>
</p-galleria>`,
        html: `<div class="card flex justify-center">
    <div *ngIf="images() && images().length > 0" class="grid grid-cols-12 gap-4" style="max-width: 800px;">
        <div *ngFor="let image of images(); let index = index" class="col-span-4" key="index">
            <img [src]="image.thumbnailImageSrc" [alt]="image.alt" style="cursor: pointer" (click)="imageClick(index)" />
        </div>
    </div>
    <p-galleria
        [(value)]="images"
        [(visible)]="displayCustom"
        [(activeIndex)]="activeIndex"
        [responsiveOptions]="responsiveOptions"
        [containerStyle]="{ 'max-width': '850px' }"
        [numVisible]="7"
        [circular]="true"
        [fullScreen]="true"
        [showItemNavigators]="true"
        [showThumbnails]="false"
    >
        <ng-template #item let-item>
            <img [src]="item.itemImageSrc" style="width: 100%; display: block;" />
        </ng-template>
    </p-galleria>
</div>`,
        typescript: `import { Component, OnInit, model } from '@angular/core';
import { PhotoService } from '@/service/photoservice';
import { PhotoService } from '@/service/photoservice';
import { GalleriaModule } from 'primeng/galleria';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'galleria-custom-content-demo',
    templateUrl: './galleria-custom-content-demo.html',
    standalone: true,
    imports: [GalleriaModule, CommonModule],
    providers: [PhotoService]
})
export class GalleriaCustomContentDemo implements OnInit {
    displayCustom: boolean | undefined;

    activeIndex: number = 0;

    images = model([]);

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => this.images.set(images));
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}`,
        data: `
/* PhotoService */
{
    itemImageSrc: 'https://primeng.org/images/galleria/galleria1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
...`,
        service: ['PhotoService']
    };
}
