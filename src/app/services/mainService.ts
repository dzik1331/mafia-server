import {Observable} from "rxjs";
import {database} from "../app";

export class MainService {
    public dataToString(data) {
        if (!data)
            return null;
        else
            return `'${data}'`;

    }

    checkSession(request) {
        return new Observable((observer) => {
            observer.next(true);
            observer.complete();
            // const session = request.headers['user-session'];
            // if (session == null || session == undefined || session == '') {
            //     observer.next(false);
            //     observer.complete();
            //     return;
            // }
            // database.get(`Select session, userId, active From sessions WHERE session = '${session}'`, (err, data) => {
            //     if (err != null)
            //         observer.next(false);
            //     else {
            //         if (data) {
            //             observer.next(data);
            //         } else {
            //             observer.next(false);
            //         }
            //     }
            //     observer.complete();
            // });
        })
    }

    sendSessionError(observer) {
        observer.error(666);
        observer.complete();
    }
}
