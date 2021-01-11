import { ReferentielService } from './../../referentiel/Service/referentiel.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {

  formadd: FormGroup;
  files: File[] = [];
  Refs;
  langue;
  description;
  email;
  lieu;
  fabrique;
  dateDebut;
  dateFin;
  refAgate;
  appr;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private refService: ReferentielService,
  ) { }

  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({
      langue: ['', [ Validators.required]],
      lieu: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      email: ['', [ Validators.required]],
      fabrique: ['', [ Validators.required]],
      dateFin: ['', [ Validators.required]],
      dateDebut: ['', [ Validators.required]],
      refAgate: ['', [ Validators.required]],
    }
    );

    this.refService.findAllRefs().subscribe(
      (response: any) => {
        this.Refs = response['hydra:member'];

        console.log(this.Refs);
      }
      ,
      (error: any) => { console.log(error); }
    );


  }
  upload(event){
    let f = event.target.files[0];
    console.log(f);

  }
  addPromo(): any{
    return false;
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
