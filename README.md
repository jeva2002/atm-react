# React ATM

Para practicar React y algunas tecnologías de su entorno se realiza un cliente de un cajero estilizado con Material UI, con formularios controlados con Formik y validaciones con la librería Yup. El cliente consume una data que se encuentra en un JSON server por medio de la librería axios.

## Ejecución

Al consumir un JSON server es indispensable que este se active antes de la ejecución del cliente en el puerto 3000, pues para este está diseñada la aplicación (npx json-server --watch data/db.json --port 3000). Posterior a esto, se deberá inicializar la ejecución del cliente; este en el momento no se ha pensado con una versión apta para producción por lo que se inicia con el comando básico de desarrollo que nos brinda create-react-app.
Para ejecutar en producción se utiliza el comando (npx serve -s build)

## Uso

La primera pantalla que aparece es el login del cajero; este es un formulario que recibe un card number y un security code propios de los usuarios que se encuentran en la base de datos. Una vez el usuario es autorizado, si es admin puede elegir si seguir como admin o entrar como usuario. Si elige el administrador podrá ver el dinero disponible en la base de datos (está organizado por denominaciones y muestra también el total general). Allí mismo también puede decidir si salir o agregar dinero al cajero. Para el rol de usuario, al ingresar se encuentra con una pantalla que le indica su dinero disponible y le permite retirar. Si la cantidad del usuario supera al dinero disponible en el cajero, el cajero sólo le entregará la cantidad máxima existente. Si la operación se realiza correctamente se llega a una pantalla de éxito que mostrará en una tabla el dinero entregado y en 10 segundos reiniciará el cajero.
