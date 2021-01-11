import { GrpCmptService } from 'src/app/grp-competences/Services/grp-cmpt.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-referentiel',
  templateUrl: './add-referentiel.component.html',
  styleUrls: ['./add-referentiel.component.css']
})
export class AddReferentielComponent implements OnInit {

  formadd;
  libelle;
  presentation;
  programme;
  critereEvaluation;
  critereAdmission;
  pdfSrc;

  compts;
  selectedCompts;
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private comptService: GrpCmptService,
    private FormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formadd = this.FormBuilder.group({
      libelle: ['', [ Validators.required]],
      presentation: ['', [ Validators.required]],
      programme: ['', [ Validators.required]],
      critereEvaluation: ['', [ Validators.required]],
      critereAdmission: ['', [ Validators.required]],
      selectedCompts: '',
    });

    this.comptService.findAllGrpCompetences().subscribe(
      (response: any) => {
        this.compts = response['hydra:member'];
      }
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

  upload(event: any){
    this.pdfSrc = event.target.files[0];
  }

  addRef(){
    console.log(this.formadd.value)
    console.log(this.pdfSrc);
    var formData = new FormData();
    formData.append('libelle', this.formadd.value.libelle);
    formData.append('presentation', this.formadd.value.presentation);
    formData.append('critereEvaluation', this.formadd.value.critereEvaluation);
    formData.append('critrreAdmission', this.formadd.value.critereAdmission);
    formData.append('programme', this.pdfSrc);
    formData.append('grpCmpt', this.formadd.value.selectedCompts);
  }




}
