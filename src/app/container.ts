import {ReflectiveInjector} from "injection-js";
import {HomeController} from "./controllers/home.controller";
import {UserController} from "./controllers/userController";
import {UserService} from "./services/user.service";
import {DebtorsController} from "./controllers/debtorsController";
import {DebtorsService} from "./services/debtors.service";

export const CONTROLLERS = [
    HomeController,
    UserController,
    DebtorsController
];

const SERVICES = [
    UserService,
    DebtorsService
];

let getProviders = () => {
    const services: any[] = SERVICES.map((c) => {
        return {provide: c, useClass: c}
    });
    const controllers: any[] = CONTROLLERS.map((c) => {
        return {provide: c, useClass: c}
    });
    return controllers.concat(services);
};
const injector = ReflectiveInjector.resolveAndCreate(getProviders());
// { provide: HomeController, useClass: HomeController },
export {injector as Container};
