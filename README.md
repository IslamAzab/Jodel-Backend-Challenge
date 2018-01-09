# Backend Code Challenge

Welcome!

For this code challenge of simple NodeJS REST API project I chose https://github.com/scotch-io/node-api.


# To run the api
```bash
docker-compose up --build
```

## Try creating some 'jodels'
```bash
curl -s -H "Content-type: application/json" -d '{"name": "The one Jodel", "score": 1}' 127.0.0.1:8080/api/jodels
```

## List current 'jodels', with query params (name, score, page and limit)
```bash
curl -s "127.0.0.1:8080/api/jodels?score=1&page=1&limit=10" 
```


## Tests
```bash
npm test
```
