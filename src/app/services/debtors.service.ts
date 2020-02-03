import {Injectable} from "injection-js";
import {database} from "../app";
import {Observable} from "rxjs";
import {MainService} from "./mainService";

@Injectable()
export class DebtorsService extends MainService {

    getAll(request) {

        let sql = "SELECT debtors.id, debtors.name, debtors.lastname, debtors.location, debtors.debt, debtors.age, targets.killerId FROM debtors LEFT JOIN targets ON  debtors.id = targets.targetId GROUP BY debtors.id;";

        return new Observable((observer) => {
            this.checkSession(request).subscribe((result) => {
                if (result) {
                    database.all(sql, (err, data) => {
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

    get(request, id) {

        let sql = "SELECT name, lastname, age, debt, location FROM debtors";

        sql = sql + ` WHERE id = ${id};`;
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

    addDebtor(request, data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO debtors (
                         name,
                         lastname,
                         age,
                         debt,
                         location
                     )
                     VALUES (
                         ${this.dataToString(data.name)},
                         ${this.dataToString(data.lastname)},
                         ${data.age},
                         ${data.debt},
                         ${this.dataToString(data.location)}
                     )`;

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

        })
    }

    editDebtor(request, data, id) {
        return new Observable((observer) => {
            let sql = `UPDATE debtors
                        SET name = ${this.dataToString(data.name)},
                        age = ${data.age},
                        debt = ${data.debt},
                        lastname = ${this.dataToString(data.lastname)},
                        location = ${this.dataToString(data.location)}
                    WHERE id = ${id};`;

            this.checkSession(request).subscribe(
                (result) => {
                    if (result) {
                        database.run(sql, (err) => {
                            if (err) {
                                observer.error(err)
                            } else {
                                observer.next('Updated')
                            }
                            observer.complete();
                        });
                    } else {
                        this.sendSessionError(observer);
                    }
                }
            )

        })
    }

    removeDebtor(request, id) {
        return new Observable((observer) => {
            let sql = `DELETE FROM debtors
                        WHERE id = ${id};`;

            this.checkSession(request).subscribe(
                (result: any) => {
                    if (result) {
                            database.run(sql, (err) => {
                                if (err) {
                                    observer.error(err)
                                } else {
                                    observer.next('Deleted')
                                }
                                observer.complete();
                            });
                    } else {
                        this.sendSessionError(observer);
                    }
                }
            )

        })
    }

    cancelTask(request, id) {
        return new Observable((observer) => {
            let sql = `DELETE FROM targets
                        WHERE targetId = ${id};`;

            this.checkSession(request).subscribe(
                (result: any) => {
                    if (result) {
                            database.run(sql, (err) => {
                                if (err) {
                                    observer.error(err)
                                } else {
                                    observer.next('Deleted')
                                }
                                observer.complete();
                            });
                    } else {
                        this.sendSessionError(observer);
                    }
                }
            )

        })
    }
}
