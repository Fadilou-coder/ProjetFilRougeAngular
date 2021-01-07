import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/users/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Profil } from 'src/app/profils/Model/profil';
import { User } from '../Model/user';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  user: any = new User(0, '', '', '', '', new Profil(0, ''), '');
  id: any;


  constructor(
    private router: Router,
    private userservice: UserService,
    private url: ActivatedRoute,
    private sanitizer:DomSanitizer
  ) { }
  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    console.log(this.id);
      this.userservice.getOneUser(this.id).subscribe(
        (response: any) => {
          this.user = response['hydra:member'][0];
          if (this.user) {
            if (this.user.image) {
                this.user.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.user.image);
            }else{
              this.user.image = '../../../assets/image/inconu.jpeg'
            }
          }else{
            this.router.navigate(['/'])
          }

        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
