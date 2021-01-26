import { TokenService } from './../token/service/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  jwt_decode  from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit {

  token = this.tokenService.getLocalStorageToken();
  decoded: any = '';

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.token){
      this.decoded = jwt_decode(this.token.token);
      console.log(this.decoded.id);
    }
  }

  logout(): void{
    this.tokenService.removeLocalStorage();
    this.router.navigate(['/login']);
  }

}
