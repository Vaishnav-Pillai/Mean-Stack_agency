import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/model/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styles: [
  ]
})
export class EditProvidersComponent implements OnInit {

  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid Email. Try Again."
  providers : ProviderClass[];
  provider = new ProviderClass();
  providersForm : FormGroup;

  id: number; //service providers id from url
  email: string; //service providers default email
  ready = false; //Load the form only when data is present

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.buildFormControls();
      this.loadData();
      
      this.route.paramMap
        .subscribe( params => this.id = parseInt(params.get('id') || '{}') );

      this.providerService.getProvider(this.id)
        .subscribe({
          next: (data) => {
            this.provider = data[0];
            console.log(data);

            //faltten object - here data[0] stores the value in the form schema of backend, therefore flattening it to a single object
            const temp: any = {};
            for(const [k1,v1] of Object.entries(this.provider)){
              switch(k1){
                case '_id' || 'id': break;
                case 'company':
                  for(const [k2,v2] of Object.entries(this.provider[k1])){
                    if(k2 != "_id"){
                      temp[k2] = v2;
                    }
                  }
                  break;
                  default:
                    temp[k1] = v1;
              }
            }

            console.log(temp);
            this.providersForm.patchValue(temp);
            setTimeout(() => {
              this.ready = true;
            }, 2000);
            
          },
          error: (error) => {
            console.log(error);
          }
        })
  }

  getControl(name: any) : AbstractControl | null {
    return this.providersForm.get(name);
  }

  handleSubmit() {
    console.log(this.providersForm);
    this.buildProvider();
    if(!this.isInvalidEmail()){
      this.providerService.updateProvider(this.id,this.provider)
        .subscribe({
          next: (data) => {

          },
          error: (error) => {
            console.log(error);
          }
        })

        this.submitted = true;
        this.emailError= false;
    } 
  }


  isInvalidEmail(){
    let email = this.providersForm.get('email')?.value;
    if(this.email == email && this.providers.filter(el => el.company.email == email).length>0){
      this.emailError = true;
      return true;
    }
    return false;
  }


  getNewId(){
    let newId : number;
    while(true){
      newId = Math.floor(Math.random() * 10000) + 99999;
      if(this.providers.findIndex(el => el.id == newId) == -1) {
        return newId;
      }
    }
  }

  buildProvider(){
    let p = this.providersForm.value;
    this.provider.id = this.getNewId();
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.position = p.position;
    this.provider.company = {
      company_name : p.company_name,
      address : p.address,
      address2 : p.address2,
      city : p.city,
      state : p.state,
      postal_code : p.postal_code,
      phone : p.phone,
      email : p.email,
      description : p.description,
      tagline : p.tagline
    };
  }


  buildFormControls(){
    this.providersForm = new FormGroup({
      firstname : new FormControl('Name',[Validators.required, Validators.minLength(2)]),
      lastname : new FormControl(),
      position : new FormControl(),
      email : new FormControl('',[Validators.required, Validators.email]),
      phone : new FormControl('',[Validators.required]),
      company_name : new FormControl(),
      address : new FormControl(),
      address2 : new FormControl(),
      city : new FormControl(),
      state : new FormControl(),
      postal_code : new FormControl(),
      description : new FormControl(),
      tagline : new FormControl()
    })
  }

  //Getting all the data from DB
  loadData(){
    this.providerService.getProviders()
      .subscribe({
        next: (data) => {
          this.providers = data;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
