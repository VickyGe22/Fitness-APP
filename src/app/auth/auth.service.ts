// import { User } from './user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TrainingService } from '../training/training.service';

import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { MatSnackBar } from '@angular/material/snack-bar';




@Injectable()

export class AuthService{
    // private user: User | undefined | null;

    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService, private snackBar: MatSnackBar){}


    isAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if (user){
                if(user.emailVerified){
                    this.isAuthenticated = true;
                    this.authChange.next(true);
                    this.router.navigate(['/training']);
                } else {
                    // 邮箱未验证，可视为未通过完整的认证流程
                    this.snackBar.open('Please verify your email first.');
                    this.logout(); // 强制登出，要求用户验证邮箱
                }
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
        .then(result => {
            // 发送验证邮件
            if (result.user){
                result.user.sendEmailVerification().then(() => {
                    this.snackBar.open('Verification email sent!Please check your inbox.', undefined, {
                        duration: 3000
                    });;
                }).catch(verificationError => {
                    this.snackBar.open('Verification Error');
                });
            }
        }).catch(error => {
            this.snackBar.open(error.message, undefined, {
                duration: 3000
            });
        });
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
        .then(result => {
            if (result.user && result.user.emailVerified) {
                // 邮箱已验证，登录成功
                this.snackBar.open('Suceessful Login');
            } else {
                // 邮箱未验证，拒绝登录
                this.snackBar.open('Please register your email first');
            }
        })
        .catch(error =>{
            this.snackBar.open(error.message, undefined, {
                duration: 3000
            })
        });
    }


    logout(){
        // this.authChange.next(false);
        // this.router.navigate(['/']);
        // this.isAuthenticated = false;
        // this.trainingService.cancelSubscriptions();
        this.afAuth.signOut().then(()=>{
            this.snackBar.open("Logout Successfully")
        });
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


