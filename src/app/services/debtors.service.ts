import {Injectable} from "injection-js";
import {database} from "../app";
import {Observable} from "rxjs";
import {MainService} from "./mainService";

interface Product {
    id;
    name;
    price;
    tags;
    img;
    description;
}

@Injectable()
export class DebtorsService extends MainService {

    getAll(request) {

        let sql = "SELECT name, lastname, age, debt, location FROM debtors;";

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

    addProduct(request, data, images) {
        return new Observable((observer) => {
            let sql = `INSERT INTO products (
                         producer,
                         description,
                         img,
                         tags,
                         price,
                         name,
                         userId
                     )
                     VALUES (
                         ${this.dataToString(data.producer) || null},
                         ${this.dataToString(data.description) || null},
                         ${this.dataToString(images.join(','))},
                         ${this.dataToString(data.tags.join(',')) || null},
                         ${data.price},
                         ${this.dataToString(data.name)},
                         ${data.userId}
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

    editProduct(request, data, id) {
        return new Observable((observer) => {
            let sql = `UPDATE products
                        SET name = ${this.dataToString(data.name)},
                        price = ${data.price},
                        tags = ${this.dataToString(data.tags.join(',')) || null},
                        description = ${this.dataToString(data.description) || null},
                        producer = ${this.dataToString(data.producer) || null}
                    WHERE id = ${id} AND 
                          userId = ${data.userId};`;

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

    removeProduct(request, productId, userId) {
        return new Observable((observer) => {
            let sql = `DELETE FROM products
                        WHERE id = ${productId} AND  
                              userId = ${userId};`;

            this.checkSession(request).subscribe(
                (result: any) => {
                    if (result) {
                        if (result.userId == userId) {
                            database.run(sql, (err) => {
                                if (err) {
                                    observer.error(err)
                                } else {
                                    observer.next('Deleted')
                                }
                                observer.complete();
                            });
                        } else {
                            observer.error(777);
                            observer.complete();
                        }
                    } else {
                        this.sendSessionError(observer);
                    }
                }
            )

        })
    }
}
