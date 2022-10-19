import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor() {}
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        //clientId: 'posts',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'posts-consumer',
      },
    },
  })
  client: ClientKafka;
  async onModuleInit() {
    this.client.subscribeToResponseOf('add.new.post');
    this.client.subscribeToResponseOf('get.posts.list');
    await this.client.connect();
  }
  async addPost() {
    const a = await this.client
      .send('add.new.post', 'hello')
      .subscribe((data) => console.log('DATA', data));
    console.log("A", a)
    return a;
  }
}
