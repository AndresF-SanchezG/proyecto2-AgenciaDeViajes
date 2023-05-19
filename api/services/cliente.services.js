const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');

//const pool = require('../libs/postgres')
//const sequelize = require('../libs/sequelize')
const { models } = require('../libs/sequelize')


class ClientsService {
  constructor() {}

    async create (data) {
    const newUser = await models.User.create(data);
    return newUser;

    }

  async find () {
    const rta = await models.User.findAll();
    return rta;


      //return this.client
  }



  //   async find () {
  //     const query = 'SELECT * FROM public.tasks';
  //     const [data] = await sequelize.query(query);
  //     return data;


  //     //return this.clients

  // }

  async findOne (id) {
    const user = await models.User.findByPk(id);
    if(!user) {
      throw boom.notFound('user not found')
    }
    return user;


  }

  async update (id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes)
    return rta;

  }

  async delete (id) {
    const user = await this.findOne(id);
   await user.destroy();
   return { id };

  }

}

module.exports = ClientsService;
