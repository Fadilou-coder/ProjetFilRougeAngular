import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  submited = false;
  formadd: FormGroup;
  email;
  password ;
  prenom ;
  nom;
  profil;
  image;
  confirm;
  profils;
  private imageSelect: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userservice: UserService,
  ) { }
  ngOnInit(): void {
      this.userservice.findAllProfil(1).subscribe(
        (data: any) => {
          this.profils = data['hydra:member'];
        }
      );
      this.formadd = this.formBuilder?.group({
        email: ['', [ Validators.required, Validators.email]],
        password: ['', [ Validators.required, Validators.minLength(6)]],
        prenom: ['', [ Validators.required]],
        nom: ['', [Validators.required]],
        profil: ['', [ Validators.required]],
        image: ['', [ Validators.required]],
        confirm: ['', [ Validators.required, ]]
      });

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  onFilSelected(event: any) {
    this.imageSelect = event.target.files[0];
  }


  addUser(){
     this.submited = true;
     console.log(this.profil);
     console.log(this.formadd.status
     );
     if (this.formadd.status === 'VALID') {
      var formData = new FormData();
      formData.append('prenom', this.formadd.value.prenom);
      formData.append('nom', this.formadd.value.nom);
      formData.append('email', this.formadd.value.email);
      formData.append('password', this.formadd.value.password);
      formData.append('image', this.imageSelect);
      formData.append('profils', this.formadd.value.profil);
      this.userservice.addUser(formData).subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/acceuil/users']);
        },
        error => {
          console.log(error);
          alert(error.error.detail);
        }
      );
    }
  }


}
