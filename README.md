**http://localhost:8443**
********************************
[Logowanie](#logowanie)

[Role użytkownika](#role-użytkownika)

[Lista użytkowników](#lista-użytkowników)

[Użytkownik](#użytkownik)

[Dodawanie użytkownika](#dodawanie-użytkownika)

[Edycja użytkownika](#edycja-użytkownika)

[Usuwanie użytkownika](#usuwanie-użytkownika)

[Lista tagów](#lista-tagów)

[Lista produktów](#lista-produktów)

[Dodawanie produktu](#dodawanie-produktu)

[Edycja produktu](#edycja-produktu)

[Usuwanie produktu](#usuwanie-produktu)

## **Logowanie**

`/api/user/login [POST]`

Wysyłamy: 

    
Odpowiedź:

##### Status: 200
    {
        id: 1,
        login: 'Login', 
        name: 'Imię', 
        lastName: 'Nazwisko', 
        role: 1,
        userSession: "sha1$a43f2aa2$1$9199c53aec821ff9249424ad49bb09190b138ad81543956615564"
    }
    userSession należy potem wysyłać w każdym requeście w headerze user-session

##### Status 404

`NO_FOUND lub BAD_PASSWORD`
********************************

## **Role użytkownika**

`/api/user/roles [Get]`


Odpowiedź:

##### Status: 200
    [
        {"id":1,"name":"administrator"},
        {"id":2,"name":"użytkownik"},
        {"id":3,"name":"sprzedawca"}
    ]
##### Status: 404
********************************

## **Lista użytkowników**

`/api/user/all [Get]`


Odpowiedź:

##### Status: 200
    [
        {
            "id": 5
            "lastName": "Nieradzik"
            "login": "krzynie1331"
            "name": "Krzysztof"
            "role": 2
            "roleName": "użytkownik"
        },
        ...
    ]
##### Status: 404
********************************

## **Użytkownik**

`/api/user/get-user/:id [Get]`


Odpowiedź:

##### Status: 200
    [
        {
            "id": 5
            "lastName": "Nieradzik"
            "login": "krzynie1331"
            "name": "Krzysztof"
            "role": 2
            "roleName": "użytkownik"
        },
        ...
    ]
##### Status: 404
********************************

## **Dodawanie użytkownika**

`/api/user/add [POST]`

Wysyłamy:
 
    {
        login: 'Janko13',
        name: 'Jan',
        lastName: 'Kowalski',
        password: 'AlaMakota123',
        role: 1
    }

Odpowiedź:

##### Status: 200
    Added
##### Status: 404
********************************

## **Edycja użytkownika**

`/api/user/edit [PUT]`

Wysyłamy:
 
    {
        id: 1
        login: 'Janko13',
        name: 'Jan',
        lastName: 'Kowalski',
        role: 1
    }

Odpowiedź:

##### Status: 200
    Added
##### Status: 404

## **Usuwanie użytkownika**

`/api/user/delete/:id [DELETE]`

Odpowiedź:

##### Status: 200
    Removed
##### Status: 404
********************************

## **Lista tagów**

`/api/product/tags [GET]`

Odpowiedź:

    ['tag1', 'tag2', 'tag3',...]


********************************

## **Lista produktów**

`/api/product/list [GET]` lub `/api/product/list/userId - tutaj podajemy id użytkownika [GET]`

##### Podając userId dostajemy produkty tylko wybranego użytkownika, bez userId liste wszystkich produktów z bazy

Odpowiedź:
    
    [
        {
            "id":14,
            "name":"Nazwa",
            "price": 12,
            "tags":"Elektronika",
            "img": "obrazek1.png, obrazek2.png, obrazek3.jpg",
            "description": "Opis",
            "producer": "BikCompany",
            "userId": 12,
            "seller": "Bogdan36"
            }
            ,...
    ]

********************************

## **Dodawanie produktu**

`/api/product/add [POST]`

Wysyłamy:
 
    {
        producer: 'Nazwa producenta',
        description: 'Opis',
        "img": {
                    name: "Nazwa pliku",
                    result: /9j/4AAQSkZJRgABAQAAAQABAAD/4QAYRXhpZgAASUkqAAgAAA - obrazek w base64
         },
        tags: ['tag1,tag2,tag3'],
        price: 99.99,
        name: 'Nazwa produktu',
        userId: 1
    }

Odpowiedź:

##### Status: 200
    Added
##### Status: 404
    NO_FOUND
********************************

## **Edycja produktu**

`/api/product/edit/:id [PUT]`

Wysyłamy:
 
    {
        producer: 'Nazwa producenta',
        description: 'Opis',
        tags: ['tag1,tag2,tag3'],
        price: 99.99,
        name: 'Nazwa produktu',
        userId: 1
    }

Nie można edytować obrazków produktu

Odpowiedź:

##### Status: 200
    Edited
##### Status: 404
    NO_FOUND
********************************

## **Usuwanie produktu**

`/api/product/remove/:productId/:userId [DELETE]`



Odpowiedź:

##### Status: 200
    Deleted
##### Status: 404
    NO_FOUND
##### Status: 666
     Brak sesji
##### Status: 777
     Nie można usunąć
********************************