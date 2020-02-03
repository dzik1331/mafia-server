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
import * as fs from "fs";
import {KillersService} from "../services/killers.service";

@Controller('/killers')
export class KillersController extends ApiController {
    private LIMIT_IMAGES = 4;

    constructor(private killersService: KillersService) {
        super();
    }

    @SendsResponse()
    @HttpGet('/list')
    products() {
        this.killersService.getAll(this.request).subscribe((result) => {
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
        this.killersService.get(this.request, id).subscribe((result) => {
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
        this.killersService.getAll(this.request).subscribe((result) => {
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
        this.killersService.addKiller(this.request, body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
            console.log(error)
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sesji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(error);
                }
            })
    }

    @SendsResponse()
    @HttpPost('/set-target')
    setTarget(body) {
        this.killersService.setTarget(this.request, body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                if (error == 666) {
                    this.response.status(HttpStatusCode.forbidden).json('Brak sesji');
                } else {
                    this.response.status(HttpStatusCode.notFound).json(null);
                }
            })
    }

    @SendsResponse()
    @HttpDelete('/cancel-target/:id')
    removeTarget(id) {
        this.killersService.removeTarget(this.request, id).subscribe((result) => {
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
        this.killersService.editKiller(this.request, body, id).subscribe((result) => {
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
        this.killersService.removeKiller(this.request, id).subscribe((result) => {
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
