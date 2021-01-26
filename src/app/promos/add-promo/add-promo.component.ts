import { IDropdownSettings } from 'ng-multiselect-dropdown';
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
  langue = 'francais';
  titre;
  description;
  email;
  lieu;
  fabrique = 'fabrique';
  dateDebut;
  dateFin;
  refAgate;
  image;
  fichier;
  selectedRefs;
  dropdownSettings: IDropdownSettings = {};


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private refService: ReferentielService,
  ) { }

  ngOnInit(): void {
    this.formadd = this.formBuilder?.group({
      langue: ['', [ Validators.required]],
      titre: ['', Validators.required],
      lieu: ['', [ Validators.required]],
      description: ['', [ Validators.required]],
      email: ['', [ Validators.required]],
      fabrique: ['', [ Validators.required]],
      dateFin: ['', [ Validators.required]],
      dateDebut: ['', [ Validators.required]],
      refAgate: ['', [ Validators.required]],
      fichier: '',
      selectedRefs: ['', [ Validators.required]]
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

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'libelle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };


  }
  upload(event){
    this.fichier = event.target.files[0];
  }
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files);
    this.image = this.files[0];
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  addPromo(): any{
    console.log(this.email)
    var refs = '';
    var appr = '';
    if (this.selectedRefs) {
      this.selectedRefs.forEach(element => {
        refs += element.libelle+',';
      });
    }
    if (this.email) {
      this.email.forEach(element => {
        appr += element.email+',';
      });
    }
    var formdata = new FormData();
    formdata.append('langue', this.langue);
    formdata.append('titre', this.titre);
    formdata.append('lieu', this.lieu);
    formdata.append('description', this.description);
    formdata.append('referenceAgate', this.refAgate);
    formdata.append('dateDebut', this.dateDebut);
    formdata.append('dateFinProvisoire', this.dateFin);
    formdata.append('fabrique', this.fabrique);
    formdata.append('refs', refs);
    formdata.append('image', this.image);
    formdata.append('apps', appr);
    formdata.append('fichier', this.fichier);

    this.refService.addPromo(formdata).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['/acceuil/users'])
      },err => {
        console.log(err);
      }

    );
  }

}
