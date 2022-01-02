const inquirer = require( 'inquirer' );
require( 'colors' );

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [ 
            {
                value: 1,
                name: `${ '1.-'.green } Buscar Ciudad`
            },
            {
                value: 2,
                name: `${ '2.-'.green } Historial`
            },
            {
                value: 0,
                name: `${ '0.-'.green } Salir`
            }
         ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log( '================================'.green );
    console.log( '      Seleccione una opción'.white );
    console.log( '================================\n'.green );

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`,
        }
    ];

    console.log( '\n' );
    await inquirer.prompt(pregunta);
}

const leerInput = async( mensaje ) => {
    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message: mensaje,
            validate( value ) {
                if( value.length ===  0 ) {
                    return 'Porfavor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { descripcion } = await inquirer.prompt( pregunta );
    return descripcion;
}

const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map(( tarea, i ) => {
        const index = `${ i + 1 }.-`.green;
        return {
            value: tarea.id,
            name: `${ index } ${ tarea.descripcion }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.-'.green + ' Cancelar'
    });

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Borra',
            choices
        }
    ];

    const { id } = await inquirer.prompt(pregunta);

    return id;
}

const confirmar = async( mensaje ) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];
    
    const { ok } = await inquirer.prompt( pregunta );

    return ok;
}

const listadoTareasModificar = async( tareas = [] ) => {
    const choices = tareas.map(( tarea, i ) => {
        const index = `${ i + 1 }.-`.green;

        return {
            value: tarea.id,
            name: `${ index } ${ tarea.descripcion }`,
            checked: ( tarea.fechaCompletado ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasModificar
};