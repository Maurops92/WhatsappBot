const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
setInterval(async () => {
  try {
    console.log('setInterval para que no se duerma el servidor en render');

  } catch (error) {
    console.log('Error: ', error)
  }
}, 60000);


const flowJuntate = addKeyword('juntate')
  .addAnswer([
    'Gracias por comunicarse con *JUNTATE*',
    'Para poder armar su cotizacion por favor complete los datos',
  ]).addAnswer([,
    '*Nombre Completo:*',
    '*Direccion del evento:*',
    '*Fecha del evento:*',
    '*Hora del evento:*',
    '*Elementos a alquilar:*'], { delay: 1500 })


const flowFletuc = addKeyword('fletuc')
  .addAnswer([
    'Gracias por comunicarse con *FLETUC*',
    'Para poder armar su cotizacion por favor complete los datos',
  ]).addAnswer(['*Nombre Completo:*',
    '*Primera Dirección(calle):*',
    '*Casa/Dpto:*',
    '*Piso/PB:*',
    '*Segunda Dirección(calle):*',
    '*Casa/Dpto:*',
    '*Piso/PB:*',
    '*Elementos a trasladar:*',
    'Cuanto mas detallado sea la información mas preciso sera el presupuesto'], { delay: 1500 })

const flowPrincipal = addKeyword(['hola', 'buen', 'que tal'])
  .addAnswer('Bienvenido')
  .addAnswer(
    [
      'Que servicio desea contratar',
      '*Juntate* para contratar servicio de vajilla',
      '*Fletuc*  para contratar servicio de flete',
    ],
    async (ctx, { fallBack }) => {
      try {
        if (!ctx.body.includes('juntate') || !ctx.body.includes('fletuc')) {
          return fallBack();
        }
      } catch (error) {
        console.error(error);
      }
    }, null, [flowJuntate, flowFletuc]
  )




const main = async () => {
  const adapterDB = new MockAdapter()
  const adapterFlow = createFlow([flowPrincipal])
  const adapterProvider = createProvider(BaileysProvider)

  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })

  QRPortalWeb()
}

main()
