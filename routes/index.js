const user = require('./user')
const auth = require('./auth')
const product = require('./prodcut')

function prefix(list,prefix){
    return list.map(el=>{
        el.path = `/${prefix}${el.path}`;
        return el;
    })
}

module.exports = {
    name:'base-route',
    version:'1.0.0',
    register:(server,options)=>{
        server.route(prefix(auth, 'auth'));
        server.route(prefix(user, 'user'));
        server.route(prefix(product, 'product'));
    }
}