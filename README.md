#node-get-lego-data [![Build Status](https://travis-ci.org/jaszczw/node-get-lego-data.svg?branch=master)](https://travis-ci.org/jaszczw/node-get-lego-data)

Project idea is to retrieve most basic data about lego sets.
It should get data from popular auctions sites and lego data aggregators.
There will be more info available as more lego services will be integrated into this project.

##What's to be done

- Configurable providers based on settings
- Additional data providers
    - ebay
    - bricklink
    - ??
- (Nice to have)
    - cache

##What's new:

v 0.1.0
- Supports different data providers that can be added either via dependency to external module, 
or programatically
    - Brickset data provider
    - Allegro data provider
    - Rebrickable data provider
    - Get links - provides static list of links for passed setId.
- Uses [node-brickset](https://github.com/boneskull/node-brickset) lib instead of naive 
implementation as brickset data provider.
- Added [Jest](https://facebook.github.io/jest/) tests with [chai](http://chaijs.com/api/bdd/) 
assertions.

## What will it do

v 1.0.0

Based on lego serie number fetches data like:
- Bricks count
- Set pic preview
- Best price on allegro
- Best price on ebay
- Suggested price on relase
- Release day

It provides links to some aggregates like:
- Brickset
- Rebrickable
- Bricklink

#Using module

1. You will have to create enviromental variables that are visible via process.env with data:
    ```
    ALLEGRO_PRIVATE_CONFIG={ "webapiKey": "qwert" }
    BRICKSET_PRIVATE_CONFIG={ "apiKey": "qazxsw" }
    REBRICKABLE_PRIVATE_CONFIG={ "apiKey": "123ewqdsa" }
    ```
    
    Api keys are obtained from sites as follows
    - [allegro webapiKey](http://allegro.pl/webapi)
    - [rebrickable apiKey](http://rebrickable.com/api/)       
    - [brickset apikey](http://brickset.com/tools/webservices/v2)

2. You have to install node modules with `npm install`
3. You run the test for module with `npm test`

Project is constantly changing so nothing is set in stone yet.

