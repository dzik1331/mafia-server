import {
    ApiController,
    Controller,
    HttpDelete,
    HttpGet,
    HttpPost,
    HttpPut,
    HttpStatusCode,
    SendsResponse
} from 'dinoloop';
import {UserService} from "../services/user.service";
import {DashboardsService} from "../services/dashboards.service";

@Controller('/dashboard')
export class DashboardController extends ApiController {

    constructor(private dashboardService: DashboardsService) {
        super();
    }

    // @SendsResponse()
    // @HttpGet('/all')
    // users() {
    //     this.userService.getAll(this.request).subscribe((result) => {
    //             this.response.status(HttpStatusCode.oK).json(result)
    //         },
    //         (error) => {
    //             if (error == 666) {
    //                 this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
    //             } else {
    //                 this.response.status(HttpStatusCode.notFound).json(null);
    //             }
    //         })
    // }
    //
    @SendsResponse()
    @HttpGet('/get/:id')
    user(id) {
        this.dashboardService.get(this.request, id).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sessji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }


    @SendsResponse()
    @HttpPost('/add')
    add(body) {
        this.dashboardService.saveDashboard(this.request, body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }
}
