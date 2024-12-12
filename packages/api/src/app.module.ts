import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesService } from './companies/companies.service';
import { CompaniesController } from './companies/companies.controller';

@Module({
  imports: [],
  controllers: [AppController, CompaniesController],
  providers: [AppService, CompaniesService],
})
export class AppModule {}
