import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VictimsModule } from './victims/victims.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CaseModule } from './case/case.module';
@Module({
  imports: [VictimsModule,
  
  ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot(process.env.DATABASEURL??""),
    CaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
