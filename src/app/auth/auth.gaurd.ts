import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable, map, retry } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export  class AuthGaurd implements CanActivate{
    constructor(private authService:AuthService){

    }
    canActivate(
        route:ActivatedRouteSnapshot,
        router:RouterStateSnapshot)
        : boolean | Promise<boolean> | Observable<boolean>{
       return this.authService.user.pipe(map(user=>{
        return !!user;
       }));    
    }
}