const boom = require('@hapi/boom');
const { faker } = require('@faker-js/faker');

const pool = require('../libs/postgres')


class ClientsService {
  constructor() {
    this.clients = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err)=>console.error(err));
  }

  generate() {
    this.clients.push({
      id: '1',
      nombre:"Andres",
      email: "andres@mail.com"
    },
    {
      id: '2',
      nombre:"Andres",
      email: "andres@mail.com",
  })
}

async create (data) {
    const newClient = {
      id: '3',
      ...data

    }
      this.clients.push(newClient);
      return newClient;
    }



    async find () {
      const query = 'SELECT * FROM public.tasks';
      const rta = await this.pool.query(query);
      return rta.rows;
      //return this.clients

  }

  async findOne (id) {

    const cliente = this.clients.find(item => item.id === id);
    if(!cliente) {
      throw boom.notFound('client not found');
    }

    return cliente;

  }

  async update (id, changes) {
    const index = this.clients.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('client not found');
    }
    const cliente = this.clients[index];
    this.clients[index] = {
      ...this.clients,
      ...changes
    };
    return this.clients[index];

  }

  async delete (id) {
    const index = this.clients.findIndex(item => item.id === id);
    if(index === -1) {
      throw boom.notFound('client not found');
    }
    this.clients.splice(index, 1);
    return { id };

  }

}

module.exports = ClientsService;
