**http://localhost:8443**
********************************
[Dłużnicy](#dłużnicy)

[Dłużnik Dodaj](#dłużnikDodaj)

[Dłużnik Edytuj](#dłużnikEdytuj)

[Dłużnik Usuń](#dłużnikUsuń)

[Dłużnik Anuluj Zlecenie](#dłużnikAnulujZlecenie)

[Zabójcy](#zabójcy)

[Zabójca Dodaj](#zabójcaDodaj)

[Zabójca Edytuj](#zabójcaEdytuj)

[Zabójca Usuń](#zabójcaUsuń)

[Zabójca Ustaw Cel](#zabójcaUstawCel)

[Zabójca Anuluj Zlecenie](#zabójcaAnulujZlecenie)


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
