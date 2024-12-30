import { Component, Input, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/section/types/types';

@Component({
  selector: 'app-social-image',
  templateUrl: './social-image.component.html',
  styleUrls: ['./social-image.component.css']
})
export class SocialImageComponent implements OnInit {
  imageExists: boolean = false;
  
 getImage(imagePath: string | undefined): string {
  // This can be used to pass a placeholder or default image for missing image paths.
  return this.imageExists ? imagePath || '' : 'https://robohash.org/'+this.name+'.png';
}

  @Input() social?: SocialMedia
  @Input() name?: string

  constructor() { }

  ngOnInit(): void {
    this.checkImageExists(this.social?.imagepath);
  }

  checkImageExists(imagePath: string | undefined) {
    if (imagePath) {
     this.imageExists = true;
    const img = new Image();
    img.onload = () => {
      this.imageExists = true;
    };
    img.onerror = () => {
      this.imageExists = false;
    };
    img.src = imagePath;
  } else {
    this.imageExists = false;
  }
}

}