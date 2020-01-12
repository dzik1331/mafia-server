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

@Controller('/user')
export class UserController extends ApiController {

    constructor(private userService: UserService) {
        super();
    }

    @SendsResponse()
    @HttpGet('/all')
    users() {
        this.userService.getAll(this.request).subscribe((result) => {
                console.debug('Result', result);
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
    @HttpGet('/get-user/:id')
    user(id) {
        this.userService.getUser(this.request, id).subscribe((result) => {
                console.debug('Result', result);
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
    @HttpPost('/login')
    login(body: any) {
        console.log(body);
        this.userService.login(body).subscribe((result) => {
            this.userService.addSession(result).subscribe((data) => {
                result['userSession'] = data;
                this.response.status(HttpStatusCode.oK).json(result)
            })
        }, (error) => {
            this.response.status(HttpStatusCode.notFound).json(error)
        })
        // return {result: {login: body.login, name: null, role: 'administrator'}};
    }

    @SendsResponse()
    @HttpGet('/roles')
    roles() {
        this.userService.getRolesQuery().subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(null);
            })
    }

    @SendsResponse()
    @HttpPost('/add')
    add(body) {
        console.log(body)
        this.userService.addUser(body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }

    @SendsResponse()
    @HttpPut('/edit')
    edit(body) {
        console.log(body)
        this.userService.editUser(body).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }

    @SendsResponse()
    @HttpDelete('/delete/:id')
    delete(id) {
        this.userService.deleteUser(id).subscribe((result) => {
                this.response.status(HttpStatusCode.oK).json(result)
            },
            (error) => {
                this.response.status(HttpStatusCode.notFound).json(error);
            })
    }
}