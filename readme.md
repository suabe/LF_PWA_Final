# PWA Language Fluency

## Introducción

Este proyecto ha sido generado con [Ionic Framework](https://github.com/ionic-team/ionic-framework).

* Ionic 5
* Angular 11
* Ionic PWA Elements
* Firebase
* Firebase Authenticate
* Twilio Voice Calls

## Installacción (entorno de desarrollo)

### NPM Package
Si no se tiene instalado Ionic, lo puede hacer desde: [Instalar Ionic](https://ionicframework.com/docs/intro/cli)

Una ves Ionic y sus dependencias esten instalados, se tienen que reconstruir los paquetes de Node, mediante `NPM`.

```bash
npm install
```

Al terminar hay que leventar la aplicaciòn con el comando:

```bash 
ionic serve
```

## Generar Componentes
Para crear un componente ejecuta `ionic g component component-name`. Se puede usar para `ionic g page|service|guard|interface|module`.

# Build(Produccion)
Para generar el build de produccion vasta con ejecutar.

```bash
ionic build --prod --service-worker
```

# Publicar
Para publidar la PWA, hay que subir por FTP el contenido de la carpeta `www`.

## Observaciones
El desarrollo esta conpuesta por una PWA, que depende del rol del usuario se muestra como Improver o Speaker.

La base de datos es una `Firestore Database`.

Su usan `Functions` de Firebse para complementar el desarrollo, su link es https://us-central1-pwa-lf.cloudfunctions.net.

Para el procesamiento de pagos se usa `PayPal Buttons`.

Para el servicio de llamadas se usa `Twilio`.
