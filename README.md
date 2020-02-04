**http://localhost:8443**
********************************
[Dłużnicy](#dłużnicy)

[Dłużnik Dodaj](#dłużnik-dodaj)

[Dłużnik Edytuj](#dłużnik-edytuj)

[Dłużnik Usuń](#dłużnik-usuń)

[Dłużnik Anuluj Zlecenie](#dłużnik-anuluj-zlecenie)

[Zabójcy](#zabójcy)

[Zabójca Dodaj](#zabójca-dodaj)

[Zabójca Edytuj](#zabójca-edytuj)

[Zabójca Usuń](#zabójca-usuń)

[Zabójca Ustaw Cel](#zabójca-ustaw-cel)

[Zabójca Anuluj Zlecenie](#zabójca-anuluj-zlecenie)

[Użytkownik Login](#użytkownik-login)

[Użytkownik Logout](#użytkownik-logout)

[Dashboard](#dashboard)

[Dashboard Zapisz](#dashboard-zapisz)


## **Dłużnicy**

`/api/debtors/list [Get]`


Odpowiedź:

##### Status: 200
    [
        {
            "id": 1,
            "name": "Leanne",
            "lastname": "Graham",
            "age": 28,
            "debt": 20000, // zadłużenie
            "location": "2.3420115717271095/48.86823741026484"
            "isTarget": true // dłużnik jest celem lub nie
        },
        ...
    ]
##### Status: 404
*******************************

## **Dłużnik Dodaj**

`/api/debtors/add [POST]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    {
        "name": "Leanne",
        "lastname": "Graham",
        "age": 28,
        "debt": 20000, // zadłużenie
        "location": "2.3420115717271095/48.86823741026484"
    }
*******************************

## **Dłużnik Edytuj**

`/api/debtors/edit/:id [PUT]`
    
Odpowiedź:

##### Status: 200
    Updated

##### Wysyłamy
    {
        "name": "Leanne",
        "lastname": "Graham",
        "age": 28,
        "debt": 20000, // zadłużenie
        "location": "2.3420115717271095/48.86823741026484"
    }

*******************************

## **Dłużnik Usuń**

`/api/debtors/remove/:id [DELETE]`
    
Odpowiedź:

##### Status: 200
    Deleted

*******************************

## **Dłużnik Anuluj Zlecenie**

`/api/debtors/cancel-task/:id [DELETE]`
    
Odpowiedź:

##### Status: 200
    Deleted

*******************************

## **Zabójcy**

`/api/killers/list [Get]`


Odpowiedź:

##### Status: 200
    [
        {
            "id": 1
            "pseudonym": "Kuba Rozpruwacz"
            "location": "18.49339971132509/50.101068659204685"
            "salary": 5000000
            "targetId": 1
        },
        ...
    ]
##### Status: 404
*******************************
## **Zabójca Dodaj**

`/api/killers/add [POST]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    {
        "pseudonym":"Kuba Rozpruwacz",
        "salary":5000000,
        "location":"19.45591796875/51.81892455776128"
    }
*******************************
## **Zabójca Edytuj**

`/api/killers/edit/:id [PUT]`
    
Odpowiedź:

##### Status: 200
    Updated

##### Wysyłamy
    {
        "pseudonym":"Kuba Rozpruwacz",
        "salary":5000000,
        "location":"19.45591796875/51.81892455776128"
    }

*******************************
## **Zabójca Usuń**

`/api/killers/remove/:id [DELETE]`
    
Odpowiedź:

##### Status: 200
    Deleted

*******************************
## **Zabójca Ustaw Cel**

`/api/killers/set-target [POST]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    {
        "killerId":4, // id zabójcy
        "targetId":3 // id dłużnika
    }
*******************************
## **Zabójca Anuluj Zlecenie**

`/api/killers/cancel-target/:id [DELETE]`
    
Odpowiedź:

##### Status: 200
    Deleted

*******************************
## **Użytkownik Login**

`/api/user/login [POST]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    {
        "login":"boss",
        "password": 'passw'
    }
    
*******************************
## **Użytkownik Logout**

`/api/user/logout [PUT]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    {
        "login":"boss",
        "id": 1
    }
*******************************
## **Dashboard**

`/api/dashboard/get/:id [GET]`
##### id = id użytkownika
    
Odpowiedź:

##### Status: 200
    {
       "widgets":"[{\"position\":{\"top\":59,\"left\":57,\"width\":44,\"height\":42},\"type\":0,\"options\":{\"title\":\"Dłużnicy\"}},{\"position\":{\"top\":59,\"left\":1,\"width\":56,\"height\":42},\"type\":1,\"options\":{\"title\":\"Zabójcy\"}},{\"position\":{\"top\":1,\"left\":1,\"width\":100,\"height\":58},\"type\":2,\"options\":{\"title\":\"Mapa\"}}]"
    }
    
    W wyniku zwracany jest obiekt zawierający pole widgets w który znajduje się string który po przeparsowaniu na JSON zawiera tablicę
    z obiektami widgetów
    
    {
        position: {top: 10, left: 10, width: 100, height: 50},
        type: 0, 1 lub 2,
        options: {title: 'Dłużnicy'}
    }
    
    
      debtor = 0;
      killers = 1;
      map = 2;
*******************************
## **Dashboard Zapisz**

`/api/dashboard/add [POST]`
    
Odpowiedź:

##### Status: 200
    Added

##### Wysyłamy
    w polu widgets przesyłamy to samo co otrzymaliśmy z serwera pobierając dashboard
    {
        "userId":1,
        "widgets":"[{\"position\":{\"top\":59,\"left\":57,\"width\":44,\"height\":42},\"type\":0,\"options\":{\"title\":\"Dłużnicy\"}},{\"position\":{\"top\":59,\"left\":1,\"width\":56,\"height\":42},\"type\":1,\"options\":{\"title\":\"Zabójcy\"}},{\"position\":{\"top\":1,\"left\":1,\"width\":100,\"height\":58},\"type\":2,\"options\":{\"title\":\"Mapa\"}}]"
    }
