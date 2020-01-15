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
        const images = [];
        body.img.forEach((image, index) => {
            if (index < this.LIMIT_IMAGES) {
                const name = new Date().getTime() + '_' + body.img[index].name;
                images.push(name);
                fs.writeFileSync("public/images/" + name, body.img[index].result, 'base64');
            }
        });
        this.killersService.addProduct(this.request, body, images).subscribe((result) => {
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
        this.killersService.editProduct(this.request, body, id).subscribe((result) => {
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
    @HttpDelete('/remove/:id/:userId')
    remove(id, userId) {
        this.killersService.removeProduct(this.request, id, userId).subscribe((result) => {
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
