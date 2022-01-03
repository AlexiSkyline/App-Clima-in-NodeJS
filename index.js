require( 'dotenv' ).config(); 

const { inquirerMenu, pausa, leerInput, listadoLugares } = require( './helpers/inquirer' );
const Busquedas = require( './models/busquedas' );

const main = async() => {
    const busquedas = new Busquedas();
    let opcion;

    do {
        opcion = await inquirerMenu();

        switch( opcion ) {
            case 1: 
                //Todo: mostar mensaje
                const busqueda = await leerInput( 'Ciudad: ' );
                //Todo: Buscar los lugares
                const lugares = await busquedas.ciudad( busqueda );
                //Todo: Selecionar el lugar
                const id = await listadoLugares( lugares );
                const lugarSelec = lugares.find( lugar => lugar.id === id );


                // * Clima
                // * Mostrar Resultados
                console.log( '\nInformación de la ciudad\n'.green );
                console.log( 'Ciudad:', lugarSelec.nombre );
                console.log( 'Lat:', lugarSelec.lat );
                console.log( 'Lng', lugarSelec.lng );
                console.log( 'Temperatura:', );
                console.log( 'Mínima:', );
                console.log( 'Máxima:', );
                break;
        }
        if( opcion !== 0 ) await pausa();
    } while( opcion != 0 );
}

main();