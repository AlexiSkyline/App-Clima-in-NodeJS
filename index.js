const { inquirerMenu, pausa } = require( './helpers/inquirer' );

const main = async() => {
    let opcion;

    do {
        opcion = await inquirerMenu();
        console.log({ opt });

        if( opt !== 0 ) await pausa();
    } while( opcion != 0 );
}

main();