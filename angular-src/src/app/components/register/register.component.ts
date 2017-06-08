import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name : String;
email: String;
username : String;
password : String;

  constructor(
  private validateService : ValidateService ,
  private flashMessage : FlashMessagesService,
  private authService : AuthService,
  private router : Router
  ) { }

  ngOnInit() {
  }
  
  onRegisterSubmit(){
  const user = {
   name : this.name,
   email: this.email,
   username: this.email,
   password: this.password
  }
  
  //Required Fields
  if(!this.validateService.validateRegister(user)){
    this.flashMessage.show('Please Fill In All The Fields' , {cssClass : 'alert-danger' , timeout : 3000} );
    return false;
  }
  
  //Validate email
  if(!this.validateService.validateEmail(user.email)){
 this.flashMessage.show('Please Enter A Valid Email' , {cssClass : 'alert-danger' , timeout : 3000} );
    return false;
  }

//Register User
this.authService.registerUser(user).subscribe(data => {
    if(data.success){
    this.flashMessage.show('You Are Now Registered And Can Login' , {cssClass : 'alert-success' , timeout : 3000} );
    this.router.navigate(['/login']);
    }else{
    this.flashMessage.show('Something Went Wrong' , {cssClass : 'alert-danger' , timeout : 3000} );
    this.router.navigate(['/register']);
    }
});

}
}
