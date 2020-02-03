import {Injectable} from "injection-js";
import {database} from "../app";
import {Observable} from "rxjs";
import {MainService} from "./mainService";

@Injectable()
export class KillersService extends MainService {

    getAll(request) {

        let sql = "SELECT killers.id, killers.pseudonym, killers.location, killers.salary, targets.targetId FROM killers LEFT JOIN targets ON killers.id = targets.killerId;";

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

    addKiller(request, data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO killers (
                         pseudonym,
                         salary,
                         location
                     )
                     VALUES (
                         ${this.dataToString(data.pseudonym)},
                         ${data.salary},
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

    setTarget(request, data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO targets (
                         killerId,
                         targetId,
                         typeId
                     )
                     VALUES (
                         ${data.killerId},
                         ${data.targetId},
                         1
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

    editKiller(request, data, id) {
        return new Observable((observer) => {
            let sql = `UPDATE killers
                        SET pseudonym = ${this.dataToString(data.pseudonym)},
                        salary = ${data.salary},
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

    removeTarget(request, killerId) {
        return new Observable((observer) => {
            let sql = `DELETE FROM targets
                        WHERE killerId = ${killerId}`;


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

    removeKiller(request, killerId) {
        return new Observable((observer) => {
            let sql = `DELETE FROM killers
                        WHERE id = ${killerId}`;
            let sql2 = `DELETE FROM targets
                        WHERE killerId = ${killerId}`;

            this.checkSession(request).subscribe(
                (result: any) => {
                    if (result) {
                        database.run(sql, (err) => {
                            if (err) {
                                observer.error(err)
                            } else {
                                observer.next('Deleted')
                                database.run(sql2, () => {
                                });
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
