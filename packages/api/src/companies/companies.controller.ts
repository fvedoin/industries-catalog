import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  getAllCompanies() {
    try {
      return this.companiesService.getCompanies();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to find companies',
          stacktrace: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
