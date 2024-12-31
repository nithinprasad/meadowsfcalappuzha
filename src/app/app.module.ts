import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './section/topbar/topbar.component';
import { NavbarComponent } from './section/navbar/navbar.component';
import { HeaderCourosalComponent } from './section/header-courosal/header-courosal.component';
import { AboutUsComponent } from './section/about-us/about-us.component';
import { ServiceOfferedComponent } from './section/service-offered/service-offered.component';
import { DestinationsComponent } from './section/destinations/destinations.component';
import { TourComponent } from './section/tour/tour.component';
import { PackagesComponent } from './section/packages/packages.component';
import { GalleryComponent } from './section/gallery/gallery.component';
import { TeamsComponent } from './section/teams/teams.component';
import { BlogComponent } from './section/blog/blog.component';
import { TestimonialComponent } from './section/testimonial/testimonial.component';
import { FooterComponent } from './section/footer/footer.component';
import { OwnersComponent } from './section/owners/owners.component';
import { SocialImageComponent } from './shared/social-image/social-image.component';
import { OfficialsComponent } from './section/officials/officials.component';
import { PlayersComponent } from './section/players/players.component';
import { PlayerCardComponent } from './shared/player-card/player-card.component';
import { FifaCardComponent } from './shared/fifa-card/fifa-card.component';
import { SponsersComponent } from './section/sponsers/sponsers.component';

const firebaseConfig = {
  apiKey: "AIzaSyBUs38p2ZwjaKJ0lk11G_2vyzsWe8plBDY",
  authDomain: "meadowsfcalappuzha.firebaseapp.com",
  projectId: "meadowsfcalappuzha",
  storageBucket: "meadowsfcalappuzha.firebasestorage.app",
  messagingSenderId: "715227030818",
  appId: "1:715227030818:web:aba2403abf47aa905d317b",
  measurementId: "G-1Z3TQRQPFG"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    NavbarComponent,
    HeaderCourosalComponent,
    AboutUsComponent,
    ServiceOfferedComponent,
    DestinationsComponent,
    TourComponent,
    PackagesComponent,
    GalleryComponent,
    TeamsComponent,
    BlogComponent,
    TestimonialComponent,
    FooterComponent,
    OwnersComponent,
    SocialImageComponent,
    OfficialsComponent,
    PlayersComponent,
    PlayerCardComponent,
    FifaCardComponent,
    SponsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
