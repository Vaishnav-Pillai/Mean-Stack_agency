import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styles: [
  ]
})
export class DetailsProvidersComponent implements OnInit {

  company_name: string;
  description: string;
  tagline: string;
  id: number;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;

  constructor (private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
      
    this.route.paramMap
    .subscribe( params => this.id = parseInt(params.get('id') || '{}') );

    this.providerDetails();

  }

  providerDetails(){

    this.providerService.detailProvider(this.id)
    .subscribe({
      next: (data) => {
        console.log(data);

        this.company_name = data[0].company.company_name;
        this.description = data[0].company.description;
        this.tagline = data[0].company.tagline;
        this.address = data[0].company.address;
        this.city = data[0].company.city;
        this.state = data[0].company.state;
        this.postal_code = data[0].company.postal_code;
        this.phone = data[0].company.phone;
        this.email = data[0].company.email;

      },
      error: (error) => {
        console.log(error);
      }
    })
  
  }

}
