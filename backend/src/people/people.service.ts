import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import * as fs from 'node:fs';
import { join } from 'path';

const DATABASE_FILE_NAME = 'db.json';

@Injectable()
export class PeopleService {
  private readDatabase = (): { lastIndex: number; data: Person[] } => {
    return JSON.parse(
      fs.readFileSync(join(process.cwd(), DATABASE_FILE_NAME), 'utf-8'),
    );
  };

  private writeDataToDatabase = (data: Person[], lastIndex: number) => {
    fs.writeFileSync(
      join(process.cwd(), DATABASE_FILE_NAME),
      JSON.stringify({ data, lastIndex }),
    );
  };

  create(createPersonDto: CreatePersonDto) {
    const { data, lastIndex } = this.readDatabase();

    data.push({
      ...createPersonDto,
      id: lastIndex + 1,
    });
    this.writeDataToDatabase(data, lastIndex + 1);
    return { message: 'Added' };
  }

  findAll(
    page: number,
    pageSize: number,
    order: 'asc' | 'desc',
    age: number,
    minAge: number,
  ) {
    let { data: result } = this.readDatabase();

    if (age) {
      result = result.filter((person) => person.age === age);
    }
    if (minAge) {
      result = result.filter((person) => person.age >= minAge);
    }
    if (order) {
      result.sort((first, second) =>
        order === 'asc' ? first.age - second.age : second.age - first.age,
      );
    }
    if (page && pageSize) {
      result = result.slice((page - 1) * pageSize, page * pageSize);
    }

    return result;
  }

  findOne(id: number) {
    const { data } = this.readDatabase();
    return data.find((person) => person.id === id) || {};
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    const { data, lastIndex } = this.readDatabase();
    const result = data.map((person) =>
      person.id === id ? { ...person, ...updatePersonDto } : person,
    );
    this.writeDataToDatabase(result, lastIndex);
    return { message: 'Updated' };
  }

  remove(id: number) {
    const { data, lastIndex } = this.readDatabase();
    const result = data.filter((person) => person.id !== id);
    this.writeDataToDatabase(result, lastIndex);

    return { message: 'Removed' };
  }
}
