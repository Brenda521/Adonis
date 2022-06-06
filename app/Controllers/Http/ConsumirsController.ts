import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

import Consumir from "App/Models/Consumir";
import axios from "axios";

export default class ConsumirsController {

    async showdata({ response }) {
        try {
            var g
            await Database.rawQuery('delete from consumirs')
            await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((r) => {
                //el results es para que te traiga el arreglo que quieres, varia el nombre    
                g = r.data.results

                Consumir.createMany(g)

            }).catch((m) => {
                response.badRequest({
                    message: 'No existen datos'
                })
            });

            response.ok({ message: 'Datos traidos', data: g })
        }
        catch (error) {
            response.badRequest({
                message: 'No existen datos'
            })
        }
    }

    async mostrardatos({ response }) {
        try {
            const b = await Consumir.all()
            response.ok({ message: 'Datos tridos', data: b })
        }
        catch (error) {
            response.badRequest({
                message:'No existen datos'
            })
        }
    }

}
