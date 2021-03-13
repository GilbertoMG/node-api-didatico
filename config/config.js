const env = process.env.NODE_ENV || 'dev';
const config = ()=>{
    switch (env) {
        case 'dev':
            return{
                bd_string : 'mongodb://localhost:27017/users',
                api_key :'xxx'

            }
        case 'hml':
            return{
                bd_string : 'mongodb://localhost:27017/users',
                api_key :'xxx'

            }
        case 'prod':
            return{
                bd_string : 'mongodb://localhost:27017/users',
                api_key :'xxx'

            }

    }
}
console.log(`${env}`);
module.exports = config();