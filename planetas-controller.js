module.exports = () => {

    const listar = async (req, res, next) => {
        
        const result = [
            { nome: 'test1', clima: 'test1', terreno: 'test1' },
            { nome: 'test2', clima: 'test2', terreno: 'test2' },
            { nome: 'test3', clima: 'test3', terreno: 'test3' },
            { nome: 'test4', clima: 'test4', terreno: 'test4' },
        ]

        return new Promise(function (resolve, reject){
            resolve(res.json(result))
        });
    }
    
    return {
        listar
    }

}