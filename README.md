## Gerekli Paketler

* [NodeJS](https://nodejs.org/en/)

## Proje Yapısı

```
├── bin
│   └── www -- Uygulama giriş dosyası
├── public
│   ├── __init__.py
│   ├── database.py -- Database ayarlanması
│   └── models.py -- Tabloların modellenmesi ve tablo fonksiyonları.
├── routes
│   ├── __init__.py
│   ├── Account.py -- Kullanıcı ile ilgili API işlemleri
│   └── Event.py -- Etkinlikler ile ilgili API işlemleri
│   └── Global.py -- Hata ve log ile ilgili API işlemleri
├── test
│   ├── __init__.py
│   ├── test_api.py -- API Unit testleri
├── .dockerignore -- Docker konteynerda hariç tutulan dosyalar
├── dockerfile -- Docker imajı oluşturmak için kullanılan dockerfile
├── .gitignore -- Git reposunda hariç tutulan dosyalar
├── app.js -- Server konfigürasyon giriş dosyası --> /bin/www
├── .gıtlab-ci.yml -- Gitlab CICD konfigürasyonu
├── .env -- Ortam değişkenlerinin bulunduğu dosya
├── .env.example -- Ortam değişkenleri örnek dosyası
├── README.md
├── package.json -- NPM scriptleri ve gerekli paketler
└── nodemon.json -- Nodemon konfigürasyonu
```

## Kurulum

NodeJS Modüllerinin kurulumu:
```
npm install
```
## Ortam Değişkenlerinin ayarlanması

### Yerel Sunucu

Yerel sunucu çalıştırırken uygulama .env dosyasından ortam değişkenlerini okur.

Örnek .env dosyası:
```
PORT=3000
API_URL=http://192.168.5.55:5000/api/v1
```

### Heroku

Heroku deployment için ortam değişkenleri heroku uygulama sayfasındaki ayarlar bölmesinden ayarlanır.

```
Heroku
    └── ml-tbt-hitappengine-web
        └── Settings
            └── Reveal Config Vars
```

### CI/CD

Gitlab ci/cd için ortam değişkenleri uygulama ayarlarında CI/CD sekmesinden ayarlanır.

```
Gitlab
    └── ML-TBT-HitappEngine-Web
        └── Settings
            └── CI / CD
                └── Variables
```

## Build


[Parcel Bundler](https://parceljs.org/) ile bundle.js oluşturma:
```
npm run build
```
veya
```
npm run watch // JavaScript dosyalarındaki değişimlerde otomatik günceller
```

## Test

Unit testleri çalıştırma:
```
npm test
```


## Başlatma

```
npm start
```

## Docker Kullanımı

Gerekli Paketler: [Docker](https://www.docker.com/)

Docker imaj oluşturma:
```
docker build --rm -f "dockerfile" -t hitsoft/hitappengine-web:latest .
```

Docker imajını başlatma:
```
docker run --rm -d -p 3000:3000/tcp hitsoft/hitappengine-web:latest
```
