import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-delete-providers',
  templateUrl: './delete-providers.component.html',
  styles: [
  ]
})
export class DeleteProvidersComponent implements OnInit {

  id: number;
  company: string;
  isDeleted = false;

  constructor (private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap
    .subscribe( params => this.id = parseInt(params.get('id') || '{}') );

    this.deleteRecord();

  }

  deleteRecord(){

    this.providerService.deleteProvider(this.id)
      .subscribe({
        next: (data) => {
          this.company = data.company.company_name;
          this.isDeleted = true;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

}
