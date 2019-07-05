## Gerekli Paketler

* [NodeJS](https://nodejs.org/en/)

## Kurulum

NodeJS Modüllerinin kurulumu:
```
npm install
```
veya
```
yarn install
```

## Build

Parcel-Bundler ile Bundle.js oluşturma:
```
npm run build
```
veya
```
npm run watch // JS Dosyalarındaki değişimlerde otomatik günceller
```

## Başlatma

```
npm start
```

## Docker Kullanımı

Docker imaj oluşturma:
```
docker build --rm -f "dockerfile" -t hitsoft/hitappengine-web:latest .
```

Docker imajını başlatma:
```
docker run --rm -d -p 3000:3000/tcp hitsoft/hitappengine-web:latest
```
