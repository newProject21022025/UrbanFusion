import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { Clothes, ClothesSchema } from './schemas/clothes.schema';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clothes.name, schema: ClothesSchema }]),
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        socket: {
          host: 'localhost',
          port: 6379,
        },
        ttl: 60,
      }),
    }),
  ],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}



// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ClothesController } from './clothes.controller';
// import { ClothesService } from './clothes.service';
// import { Clothes, ClothesSchema } from './schemas/clothes.schema';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Clothes.name, schema: ClothesSchema }]),
//   ],
//   controllers: [ClothesController],
//   providers: [ClothesService],
  
// })
// export class ClothesModule {}

