
const Encoder = require( './src/coding/encoder' );

const { 
  Message,
  SelectReq  } = require( './src/hsms' )

  // const m = new SelectReq( 1, 2 );
  // const buffer = Encoder.encode( m );
  
  // console.log( buffer );

  const sr =  new SelectReq( 2781, 37541 );

    const encodedArray = Encoder.encode( sr );

    console.log( "end" )