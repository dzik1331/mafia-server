import {Injectable} from "injection-js";
import {Observable} from "rxjs";
import {database} from "../app";
import {MainService} from "./mainService";
import * as c from "password-hash"

@Injectable()
export class UserService extends MainService {


    getAll(request) {
        let sql = "Select users.id, users.login, users.name, users.lastName, users.role, userRoles.name as roleName From users LEFT JOIN userRoles on userRoles.id = role";
        return new Observable((observer) => {
            this.checkSession(request).subscribe((result) => {
                if (result) {
                    database.all(sql, (err, data) => {
                        console.debug('errrrr', err);
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

    getUser(request, userId) {
        let sql = `Select id, login, name, lastName, role From users WHERE id = ${userId}`;
        return new Observable((observer) => {
            this.checkSession(request).subscribe((result) => {
                if (result) {
                    database.get(sql, (err, data) => {
                        console.debug('errrrr', err);
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

    login(userData) {
        return new Observable((observer) => {
            database.get(`Select id, login, name, lastName, role, password From users WHERE login = '${userData.login}'`, (err, data) => {
                if (err != null)
                    observer.error('NO_FOUND');
                else {
                    if (data) {
                        if (c.verify(userData.password, data.password)) {
                            delete data.password;
                            observer.next(data)
                        } else {
                            observer.error('BAD_PASSWORD')
                        }
                    } else {
                        observer.error('NO_FOUND');
                    }
                }
                observer.complete();
            });
        })
    }

    addSession(user) {
        return new Observable((observer) => {
            // dezaktywujemy aktywne sesje użytkownika
            const inactiveSession = `UPDATE sessions
                                        SET 
                                            active = false
                                      WHERE userId = ${user.id}`;
            database.run(inactiveSession, (err) => {
                if (!err) {
                    // dodajemy nową sesję
                    const s = c.generate(user.login) + new Date().getTime();
                    let sql = `INSERT INTO sessions (session, userId)
                     VALUES (${this.dataToString(s)}, ${user.id})`;
                    database.run(sql, (err) => {
                        if (err) {
                            observer.error(err)
                        } else {
                            observer.next(s)
                        }
                        observer.complete();
                    });
                } else {
                    observer.error(err)
                }
            });
        })
    }

    getRolesQuery() {
        return new Observable((observer) => {
            database.all("Select * From userRoles", (err, data) => {
                if (err != null)
                    observer.next(null);
                else
                    observer.next(data)
                observer.complete();
            });
        })
    }

    addUser(data) {
        return new Observable((observer) => {
            let sql = `INSERT INTO users (
                         login,
                         name,
                         lastName,
                         password,
                         role
                     )
                     VALUES (
                         ${this.dataToString(data.login)},
                         ${this.dataToString(data.name)},
                         ${this.dataToString(data.lastName)},
                         ${this.dataToString(c.generate(data.password))},
                         ${data.role}
                     )`;
            database.run(sql, (err) => {
                if (err) {
                    observer.error(err)
                } else {
                    observer.next('Added')
                }
                observer.complete();
            });
        })
    }

    editUser(data) {
        return new Observable((observer) => {
            let sql = `UPDATE users
                        SET login = ${this.dataToString(data.login)},
                        name = ${this.dataToString(data.name)},
                        lastName = ${this.dataToString(data.lastName)},
                        role = ${data.role}
                        WHERE id = ${data.id};`;
            database.run(sql, (err) => {
                if (err) {
                    observer.error(err)
                } else {
                    observer.next('Added')
                }
                observer.complete();
            });
        })
    }

    deleteUser(id) {
        return new Observable((observer) => {
            let sql = `DELETE FROM users WHERE id = ${id}`;
            database.run(sql, (err) => {
                if (err) {
                    observer.error(err)
                } else {
                    observer.next('Removed')
                }
                observer.complete();
            });
        })
    }

}