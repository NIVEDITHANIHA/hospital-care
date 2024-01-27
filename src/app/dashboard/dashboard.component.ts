import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../service/adminapi.service';
import * as Highcharts from 'highcharts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  updateProfiile: boolean = false
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions = {};

  showsidebar: boolean = true
  allPatients: any = ""
  selected: Date = new Date()
  adminName: any
  adminDetails: any = {}
  profileImage: any = "https://th.bing.com/th/id/R.a9354c16766c159d127b63ca00468f84?rik=cAQzc7lTZ%2fxmFw&riu=http%3a%2f%2fwww.uhomeenergy.com%2fimages%2fCompany-Profile-S3-5.png&ehk=oM9C19jopa2BSaKvg6J4Y9GbbOsZuxXqmR9cjJwxicY%3d&risl=&pid=ImgRaw&r=0"
  constructor(private api: AdminapiService) {
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      accessibility: {

        description: 'This concise chart captures the evolution of hospital bed capacities in Kerala and Tamil Nadu from 2012 to 2024. The Y-axis denotes the number of beds, and the X-axis spans the years. In 2012, Kerala led with 25,000 beds, surpassing Tamil Nadu s 20,000. Both states witnessed consistent growth, with Tamil Nadu taking the lead in 2017 at 35,000 beds compared to Kerala 32,000. The trend continued, and by 2020, Tamil Nadu maintained an advantage with 40,000 beds, while Kerala had 38,000. In 2024, Kerala surged to 45,000 beds, demonstrating a substantial commitment, while Tamil Nadu reached 42,000 through ongoing development efforts. This chart succinctly outlines the dynamic healthcare infrastructure progress in both states during the specified period'
      },
      title: {
        text: 'Hospital Care'
      },
      subtitle: {
        text: 'Source: <a href="https://www.who.int/" ' +
          'target="_blank">Health</a>'
      },
      xAxis: {
        allowDecimals: false,
        accessibility: {
          rangeDescription: 'Range: 2017 to 2024.'
        }
      },
      yAxis: {
        title: {
          text: 'Hospital Care'
        }
      },
      tooltip: {
        pointFormat: '{series.name} had less <b>{point.y:,.0f}</b><br/>No Of Disease {point.x}'
      },
      plotOptions: {
        area: {
          pointStart: 2017,
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
          }
        }
      },
      series: [{
        name: 'kerala',
        data: [
          null, null, null, null, null, 2, 9, 13, 50, 170, 299, 438, 841,
          1169, 1703, 2422, 3692, 5543, 7345, 12298, 18638, 22229, 25540,
          28133, 29463, 31139, 31175, 31255, 29561, 27552, 26008, 25830,
          26516, 27835, 28537, 27519, 25914, 25542, 24418, 24138, 24104,
          23208, 22886, 23305, 23459, 23368, 23317, 23575, 23205, 22217,
          21392, 19008, 13708, 11511, 10979, 10904, 11011, 10903, 10732,
          10685, 10577, 10526, 10457, 10027, 8570, 8360, 7853, 5709, 5273,
          5113, 5066, 4897, 4881, 4804, 4717, 4571, 4018, 3822, 3785, 3805,
          3750, 3708, 3708
        ]
      }, {
        name: 'Tamilnadu',
        data: [null, null, null, null, null, null, null, null, null,
          1, 5, 25, 50, 120, 150, 200, 426, 660, 863, 1048, 1627, 2492,
          3346, 4259, 5242, 6144, 7091, 8400, 9490, 10671, 11736, 13279,
          14600, 15878, 17286, 19235, 22165, 24281, 26169, 28258, 30665,
          32146, 33486, 35130, 36825, 38582, 40159, 38107, 36538, 35078,
          32980, 29154, 26734, 24403, 21339, 18179, 15942, 15442, 14368,
          13188, 12188, 11152, 10114, 9076, 8038, 7000, 6643, 6286, 5929,
          5527, 5215, 4858, 4750, 4650, 4600, 4500, 4490, 4300, 4350, 4330,
          4310, 4495, 4477
        ]
      }]
    }
  }

  ngOnInit(): void {
    this.getAllpatients()
    this.getAdminDetails()

    if (localStorage.getItem("name")) {
      this.adminName = localStorage.getItem("name")
    }
  }


  updateProfileDetails() {
    this.api.updateAuthorization(this.adminDetails).subscribe({
      next: ((res: any) => {
        console.log(res);

        Swal.fire({
          title: "Wow!",
          text: "Succesfully Updated Profile.",
          icon: "success"
        });

        localStorage.setItem("name", res.name)
        localStorage.setItem("email", res.email)
        localStorage.setItem("password", res.password)
        this.adminName =localStorage.getItem("name")


      }),
      error: ((err) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });

      })
    })

  }


  getAdminDetails() {
    this.api.authorization().subscribe((res: any) => {
      this.adminDetails = res
      console.log(this.adminDetails);
      if (res.picture) {
        this.profileImage = res.picture
      }
    })
  }

  getAllpatients() {
    this.api.getPatient().subscribe({
      next: ((res: any) => {
        this.allPatients = res.length
        console.log(this.allPatients);
      }),
      error: ((err) => {
        console.log(err);

      })
    })

  }

  menubar() {

    this.showsidebar = !this.showsidebar

  }


  getFile(event: any) {
    let filename = event.target.files[0]
    console.log(filename);

    /* create an objecct create file reader */

    let filereader = new FileReader()

    /* read the file */
    filereader.readAsDataURL(filename)

    /* load the file */

    filereader.onload = (event: any) => {
      console.log(event.target.result);
      this.profileImage = event.target.result
      this.adminDetails.picture = this.profileImage

    }

  }

  EditProfie() {
    this.updateProfiile = true


  }

  CancelData(){
   this.getAdminDetails()
   this.updateProfiile = false
  }
}
