import {Injectable} from "injection-js";
import {database} from "../app";
import {Observable} from "rxjs";
import {MainService} from "./mainService";

@Injectable()
export class DashboardsService extends MainService {

    get(request, userId) {

        let sql = `SELECT widgets FROM dashboards WHERE userId = ${userId}`;

        return new Observable((observer) => {
            this.checkSession(request).subscribe((result) => {
                if (result) {
                    database.get(sql, (err, data) => {
                        if (err != null)
                            observer.next(null);
                        else
                            observer.next(data);
                        observer.complete();
                    });
                } else {
                    this.sendSessionError(observer);
                }
            })
        })

    }

    saveDashboard(request, data) {
        return new Observable((observer) => {
            const select = `SELECT widgets FROM dashboards WHERE userId = ${data.userId}`;
            database.get(select, (err, d) => {
                let sql;
                if (d) {
                    sql = `UPDATE dashboards 
                    SET widgets = ${this.dataToString(data.widgets)}
                    WHERE userId = ${data.userId}`;
                } else {
                    sql = `INSERT INTO dashboards (
                         userId,
                         widgets
                     )
                     VALUES (
                         ${data.userId},
                         ${this.dataToString(data.widgets)}
                     )`;
                }
                this.checkSession(request).subscribe(
                    (result) => {
                        if (result) {
                            database.run(sql, (err) => {
                                if (err) {
                                    observer.error(err)
                                } else {
                                    observer.next('Added')
                                }
                                observer.complete();
                            });
                        } else {
                            this.sendSessionError(observer);
                        }
                    }
                )
            });

        })
    }
}
