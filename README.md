**http://localhost:8443**
********************************
[Dłużnicy](#dłużnicy)

[Dłużnik](#dłużnik)


## **Dłużnicy**

`/api/debtors/list [Get]`


Odpowiedź:

##### Status: 200
    [
        {
            "name": "Leanne",
            "lastname": "Graham",
            "age": 28,
            "debt": 20000,
            "location": null
        },
        ...
    ]
##### Status: 404
*******************************

## **Dłużnik**

`/api/debtors/get/:id [GET]`
    
Odpowiedź:

##### Status: 200
    {
        "name": "Leanne",
        "lastname": "Graham",
        "age": 28,
        "debt": 20000,
        "location": null
    }

##### Status 404

`NO_FOUND`
********************************
