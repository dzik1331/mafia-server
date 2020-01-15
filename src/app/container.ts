import {ReflectiveInjector} from "injection-js";
import {HomeController} from "./controllers/home.controller";
import {UserController} from "./controllers/userController";
import {UserService} from "./services/user.service";
import {DebtorsController} from "./controllers/debtorsController";
import {DebtorsService} from "./services/debtors.service";
import {KillersService} from "./services/killers.service";
import {KillersController} from "./controllers/killersController";
import {DashboardController} from "./controllers/dashboardController";
import {DashboardsService} from "./services/dashboards.service";

export const CONTROLLERS = [
    HomeController,
    UserController,
    DebtorsController,
    KillersController,
    DashboardController
];

const SERVICES = [
    UserService,
    DebtorsService,
    KillersService,
    DashboardsService
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
export {injector as Container};
