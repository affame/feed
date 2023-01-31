import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { LocationEntity } from '~/entities/location.entity';
import { LocationRepository } from '~/repositories/location.repository';

@Injectable()
export class LocationService extends TypeOrmCrudService<LocationEntity> {
    constructor(
        @InjectRepository(LocationRepository)
        public readonly repo: Repository<LocationEntity>,
    ) {
        super(repo);
    }
}
