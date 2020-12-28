import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GrpCmptService} from '../Services/grp-cmpt.service';
import {Observable} from 'rxjs';
import {setTheme} from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-add-grp-cmpt',
  templateUrl: './add-grp-cmpt.component.html',
  styleUrls: ['./add-grp-cmpt.component.css']
})
export class AddGrpCmptComponent implements OnInit {


  formadd: FormGroup;
  libelle;
  descriptif;
  competences = [];
  value: Observable<number>;
  cmptSuggestions = ['HTML', 'PHP', 'CSS'];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private grpCpmtservice: GrpCmptService
  ) { setTheme('bs4'); }
  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({
      libelle: ['', [ Validators.required]],
      descriptif: ['', [ Validators.required]],
      competences: [],
    });

    console.log(this.formadd);

  }

  // tslint:disable-next-line: typedef
  get f(){
    return this.formadd?.controls;
  }

  addGrpCompt(): void{
    this.grpCpmtservice.addGrpCpmt(this.formadd.value).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/acceuil/grpCmpts']);
      },
      error => {
        console.log(error);
        alert(error.error.detail);
      }
    );
  }

}
