const chalk = require( 'chalk' );
const logSymbols = require( 'log-symbols' );

const { removeCacheVolume, ensureCacheExists } = require( '../gateway' );
const makeDocker = require( '../utils/make-docker' );
const makeCommand = require( '../utils/make-command' );
const makeSpinner = require( '../utils/make-spinner' );

exports.command = 'cache clear';
exports.desc = 'Clears npm, wp-cli, and WP Snapshots caches.';

exports.handler = makeCommand( chalk, logSymbols, async ( { verbose } ) => {
    const docker = makeDocker();
    const spinner = ! verbose ? makeSpinner() : undefined;

    await removeCacheVolume( docker, spinner );
    await ensureCacheExists( docker, spinner );

    if ( ! spinner ) {
        console.log( 'Cache Cleared' );
    }
} );
