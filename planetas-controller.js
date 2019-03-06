// Load the full build.
const _ = require('lodash');

const result = [
    { id: '1', nome: 'test1', clima: 'test1', terreno: 'test1' },
    { id: '2', nome: 'test2', clima: 'test2', terreno: 'test2' },
    { id: '3', nome: 'test3', clima: 'test3', terreno: 'test3' },
    { id: '4', nome: 'test4', clima: 'test4', terreno: 'test4' },
]

module.exports = () => {

    const listar = async (req, res, next) => {
        return new Promise(function (resolve, reject){
            resolve(res.json(result))
        });
    }
    
    const obterPorId = async (req, res, next) => {


        console.log('req:', req)

        return res.json(_.find(result, {'id': '1'}))
        // new Promise(function (resolve, reject){
        //     res.json(_.find(result, {'id': '1'}))
        // });
    }
    
    return {
        listar,
        obterPorId
    }
}