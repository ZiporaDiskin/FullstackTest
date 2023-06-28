import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { form } from 'src/models/form';
import { EmailService } from 'src/services/emailService';
import {  takeUntil } from 'rxjs/operators';
import { formResponse } from 'src/models/formResponse';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit, OnDestroy{

 
  destroy$: Subject<boolean> = new Subject<boolean>();

  emailForm!: FormGroup;
  form:form=new form();
  formResponse:formResponse=new formResponse();
  loadData:boolean=false
  isError:boolean=false;
  errorMessage:string=""
  constructor(private formBuilder: FormBuilder,private emailService: EmailService) { }

  
  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  sendEmail() {
    
    this.form.email=this.emailForm.controls["email"].value;
     this.emailService.sendEmail(this.form).pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          // Handle success response
          this.formResponse=response;
          this.loadData=true
        },
        error => {
          // Handle error response
          this.errorMessage=error.error
          this.isError=true
        }
      );
  }
  onSubmit() {
     if (this.emailForm.valid) {
      this.sendEmail()
     }
  
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
