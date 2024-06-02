import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  findOne(id: string): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  async update(id: string, updateEventDto: CreateEventDto): Promise<Event> {
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.eventsRepository.delete(id);
  }

  async findSimilarEvents(eventId: string): Promise<Event[]> {
    const event = await this.findOne(eventId);
    return this.eventsRepository.find({
      where: {
        category: event.category,
        date: Between(
          new Date(new Date(event.date).getTime() - 30 * 24 * 60 * 60 * 1000),
          new Date(new Date(event.date).getTime() + 30 * 24 * 60 * 60 * 1000),
        ),
        id: Not(eventId),
      },
    });
  }
}
