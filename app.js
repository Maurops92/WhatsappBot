const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const axios = require('axios-mock-adapter')


const flowPrincipal = addKeyword(['hola', 'buen', 'que tal'])
    .addAnswer('Bienvenido')
    .addAnswer(
        [
				'Que servicio desea contratar',
				'*Juntate* para contratar servicio de vajilla',
				'*Fletuc*  para contratar servicio de flete',
        ],{delay:1000},
        (ctx, {fallBack}) => {
					if(!ctx.body.includes('juntate') || !ctx.body.includes('fletuc')){
						return fallBack();
					}}
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
