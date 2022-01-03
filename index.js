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
                const clima = await busquedas.climaLugar( lugarSelec.lat, lugarSelec.lng );
                // * Mostrar Resultados
                console.clear();
                console.log( '\nInformación de la ciudad\n'.green );
                console.log( 'Ciudad:', lugarSelec.nombre.green );
                console.log( 'Lat:', lugarSelec.lat );
                console.log( 'Lng', lugarSelec.lng );
                console.log( 'Temperatura:', clima.temp );
                console.log( 'Mínima:', clima.min );
                console.log( 'Máxima:', clima.max );
                console.log( 'Como está el clima:', clima.desc.green );
                break;
        }
        if( opcion !== 0 ) await pausa();
    } while( opcion != 0 );
}

main();