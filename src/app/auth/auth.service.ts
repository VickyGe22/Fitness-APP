import { User } from './user.model';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';



@Injectable()

export class AuthService{
    // private user: User | undefined | null;

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService){}


    isAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if (user){
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.authChange.next(false);
                this.router.navigate(['/']);
                this.isAuthenticated = false;
                this.trainingService.cancelSubscriptions();
            }
        });

    }
    

    registerUser(authData: AuthData){
        // this.user={
        //     email: authData.email,
        //     userId: Math.round(Math.random()*10000).toString()
        // };手动添加用户信息

        this.afAuth.createUserWithEmailAndPassword (
            authData.email,
            authData.password
        )
        // .then(result =>{
        //     this.authSuccessfully();
        // })
        .catch(error =>{
            console.log(error)
        }
        );

        
    }

    

    login(authData: AuthData){
        // this.user={
        //     email: authData.email,
        //     userId: Math.round(Math.random()*10000).toString()
        // };
        this.afAuth.signInWithEmailAndPassword(
            authData.email,
            authData.password
        )
        // .then(result =>{
        //     this.authSuccessfully();
        // })
        .catch(error =>{
            console.log(error)
        })
    }

    logout(){
        // this.authChange.next(false);
        // this.router.navigate(['/']);
        // this.isAuthenticated = false;
        // this.trainingService.cancelSubscriptions();
        this.afAuth.signOut();
    }

    
    isAuth(){
        return this.isAuthenticated;
    }

    // private authSuccessfully(){
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.router.navigate(['/training']);
    // }

}


