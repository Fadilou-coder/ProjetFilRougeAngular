import { ReferentielService } from './../../referentiel/Service/referentiel.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private refService: ReferentielService,
  ) { }

  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({}
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
