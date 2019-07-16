# asterisk-nodejs-socket.io
Envió de eventos asterisk asíncronos desde servidor socket a clientes web usando node js y socket.io

## Instalación 🚀
* Guardar la carpeta **server** en algun lugar del servidor
* Ejecutar el comando el siguiente comando en la raíz del servidor para descargar todas las dependencias
```
npm install
```
* Generar certificados ssl y guardarlos en la carpeta **ssl** para evitar error de contenido mixto en la web debemos de iniciar nuestro servidor con https
* Modificar el archivo index.js y cargar la ruta de los archivo .key y .crt
* Para configurar conexion a asterisk debe de cambiar USERNAME_AMI y PASSWROD_AMI
* Iniciar servidor con el siguiente comando
```
npm start
```
## Ejecución
En la ejecucion puede ingresar a **https://MI_HOST:2311** y podra ver en la consola información de la llamada entrante que se origina con el evento ***newchannel***.

### Información extra 🛠️
• Por default el servidor corre en el puerto **2311** para modificarlo puedes modificar
```
const port
```
• Ejemplo de como crear un cliente qeu escuche los eventos enviados desde servidor
```
    <script src="https://MI_HOST:2311/socket.io/socket.io.js"></script>
    <script>
        var socket = io.connect('https://MI_HOST:2311');
        socket.on('inbounce', function(data) {
            console.log(data);
        });
    </script>
```
