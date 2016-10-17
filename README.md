#README

Project idea is to retrieve most basic data about lego sets.
It should get data from popular auctions sites and lego data aggregators.
There will be more info available as more lego services will be integrated into this project.

##What's to be done

- Separate data fetch module with processing and displaying received data
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

1. You will have to create your own configuration .json files or make enviromental variables that are visible via process.env with data:
    - for allegro configuration [webapi](http://allegro.pl/webapi)
    
        ```
        ./lib/allegro/private-config.json || process.env.ALLEGRO_PRIVATE_CONFIG
        {
            "webapiKey" : "xxx"
        }
        ```
    - for rebrickable configuration [api](http://rebrickable.com/api/)
    
        ```
        ./lib/rebrickable/private-config.json || process.env.REBRICKABLE_PRIVATE_CONFIG
        {
            "apiKey": "xxx"
        }
        ```
        
    - for brickset configuration [webservices](http://brickset.com/tools/webservices/v2)
    
        ```
        ./lib/brickset/private-config.json || process.env.BRICKSET_PRIVATE_CONFIG 
        {
            "apiKey": "xxx"
        }
        ```
2. You have to install node modules with `npm install`
3. You run the test for module with `npm test`

Project is constantly changing so nothing is set in stone yet.

