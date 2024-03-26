import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl } from "@angular/forms";

interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}

@Component({
  selector: "app-regular",
  templateUrl: "./regular.component.html",
  styles: [],
})
export class RegularComponent implements OnInit {
  heading = "Regular Tables";
  subheading = "Tables are the backbone of almost all web applications.";
  icon = "pe-7s-drawer icon-gradient bg-happy-itmeo";

  countrise: any = {};
content: any;

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {
    this.getData();
  }

    getData() {
    this.httpClient.get("http://localhost:8080/api/getdata").subscribe(
      (res: any) => {

        //res
        this.countrise = res;
        console.log(res);
      }
    );
  }

  ngOnInit() {}

  save() {
    let country = {
      name: this.name.value,
      area: this.area.value,
      population: this.population.value,
      flag: this.flag.value,
      countryId: this.countryId.value,
    };
    this.httpClient.post(
      "http://localhost:8080/api/country/save",
      country
    ).subscribe((res: any) => {});
  }

  delete(countryId: number) {
    this.httpClient.get(
      "http://localhost:8080/api/country/delete?countryId=" + countryId
    ).subscribe((res: any) => {
      this.getData();
    });
  }

  open(
    content: any,
    name: string,
    area: number,
    population: number,
    flag: string,
    countryId: number
  ) {
    this.name.setValue(name);
    this.area.setValue(area);
    this.population.setValue(population);
    this.flag.setValue(flag);
    this.countryId.setValue(countryId);
    let ngbModalOptions = {
      backdrop: false,
      keyboard: true,
    };
    this.modalService.open(content, ngbModalOptions).result.then(
      (result) => {}
    );
  }

  name = new FormControl("");
  area = new FormControl(0);
  population = new FormControl(0);
  flag = new FormControl(0);
  countryId = new FormControl(0);
}
