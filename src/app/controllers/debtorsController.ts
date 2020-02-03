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
import {DebtorsService} from "../services/debtors.service";
import * as fs from "fs";

@Controller('/debtors')
export class DebtorsController extends ApiController {
    private LIMIT_IMAGES = 4;

    constructor(private debtorsService: DebtorsService) {
        super();
    }

    @SendsResponse()
    @HttpGet('/list')
    products() {
        this.debtorsService.getAll(this.request).subscribe((result: any) => {
                if (Array.isArray(result)) {
                    result = result.map((r) => {
                        r['isTarget'] = !!r.killerId;
                        delete r.killerId;
                        return r;
                    });
                }
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
    @HttpGet('/get/:id')
    product(userId, id) {
        this.debtorsService.get(this.request, id).subscribe((result) => {
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
    @HttpGet('/list/:userId')
    productsById(userId) {
        this.debtorsService.getAll(this.request).subscribe((result) => {
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
        this.debtorsService.addDebtor(this.request, body).subscribe((result) => {
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
    @HttpPut('/edit/:id')
    edit(body, id) {
        this.debtorsService.editDebtor(this.request, body, id).subscribe((result) => {
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
    @HttpDelete('/remove/:id')
    remove(id) {
        this.debtorsService.removeDebtor(this.request, id).subscribe((result) => {
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
    @HttpDelete('/cancel-task/:id')
    cancelTask(id) {
        this.debtorsService.cancelTask(this.request, id).subscribe((result) => {
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
}
