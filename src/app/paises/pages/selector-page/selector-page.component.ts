import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {
  miForm : FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required]
  })

  regiones : string[] = [];
  paises : PaisSmall[] = [];
  fronterizos : string[] = [];

  constructor(
    private fb : FormBuilder,
    private paisesService : PaisesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // this.miForm.get('region')?.valueChanges.subscribe(region =>{

    //   this.paisesService.getPaisesPorRegion(region).subscribe( paises =>{
    //     this.paises = paises;
    //   });

    // })

    this.miForm.get('region')?.valueChanges
    .pipe( 
      tap( () => {
        this.miForm.get('pais')?.reset('');
      }),
      switchMap(region => this.paisesService.getPaisesPorRegion(region) )
    )
    .subscribe(paises => {
      this.paises = paises;
    })

    this.miForm.get('pais')?.valueChanges
    .pipe( 
      tap( () => {
        this.miForm.get('frontera')?.reset('');
      }),
      switchMap(codigo => this.paisesService.getPaisPorAlphaCode(codigo) )
    )
    .subscribe(pais => {
      this.fronterizos = pais?.borders || [];
    })


  }

  guardar(){

  }

}
