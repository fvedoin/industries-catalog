import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { HttpException, HttpStatus } from '@nestjs/common';

const mockCompaniesService = {
  getCompanies: jest.fn(),
};

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: mockCompaniesService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  describe('getAllCompanies', () => {
    it('should return a list of companies with total', async () => {
      const mockCompaniesData = {
        items: [
          {
            uuid: 'e6fdcbd7-255a-46c2-8395-c8094fd37cd2',
            images: {
              '32x32':
                'https://storage.googleapis.com/dealroom-images-development/31/MzI6MzI6Y29tcGFueUBzMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9kZWFscm9vbS1pbWFnZXMvMjAyNC8wNS8wNC85OTQ5YjcyMzg2YmFlZDE2ZWQ2YzM4YzNjNmZhMTM5NQ==.png',
              '74x74':
                'https://storage.googleapis.com/dealroom-images-development/fa/NzQ6NzQ6Y29tcGFueUBzMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9kZWFscm9vbS1pbWFnZXMvMjAyNC8wNS8wNC85OTQ5YjcyMzg2YmFlZDE2ZWQ2YzM4YzNjNmZhMTM5NQ==.png',
              '100x100':
                'https://storage.googleapis.com/dealroom-images-development/7b/MTAwOjEwMDpjb21wYW55QHMzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2RlYWxyb29tLWltYWdlcy8yMDI0LzA1LzA0Lzk5NDliNzIzODZiYWVkMTZlZDZjMzhjM2M2ZmExMzk1.png',
            },
            income_streams: [
              {
                id: 3,
                name: 'subscription',
              },
            ],
            industries: [
              {
                id: 100147,
                name: 'enterprise software',
              },
            ],
            name: 'Samsara',
            tagline: 'Enterprise IoT systems',
            total_jobs_available: 250,
          },
          {
            uuid: 'c8b25dbd-f781-4e93-aa71-53c970970d35',
            images: {
              '32x32':
                'https://storage.googleapis.com/dealroom-images-development/08/MzI6MzI6Y29tcGFueUBzMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9kZWFscm9vbS1pbWFnZXMvMjAyNC8wNC8yMy85NGIzMTBlNjQ5NzA1ZmM1ZGI0YjY5NDFjMzEyYjA5Mg==.png',
              '74x74':
                'https://storage.googleapis.com/dealroom-images-development/c7/NzQ6NzQ6Y29tcGFueUBzMy1ldS13ZXN0LTEuYW1hem9uYXdzLmNvbS9kZWFscm9vbS1pbWFnZXMvMjAyNC8wNC8yMy85NGIzMTBlNjQ5NzA1ZmM1ZGI0YjY5NDFjMzEyYjA5Mg==.png',
              '100x100':
                'https://storage.googleapis.com/dealroom-images-development/70/MTAwOjEwMDpjb21wYW55QHMzLWV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2RlYWxyb29tLWltYWdlcy8yMDI0LzA0LzIzLzk0YjMxMGU2NDk3MDVmYzVkYjRiNjk0MWMzMTJiMDky.png',
            },
            income_streams: [
              {
                id: 3,
                name: 'subscription',
              },
            ],
            industries: [
              {
                id: 1254,
                name: 'health',
              },
            ],
            name: 'Vivante Health',
            tagline:
              'Digital healthcare solution for digestive health and disease',
            total_jobs_available: 0,
          },
        ],
        total: 2,
      };
      mockCompaniesService.getCompanies.mockReturnValueOnce(mockCompaniesData);

      const result = await controller.getAllCompanies();

      expect(result.items[0]).toHaveProperty(
        'uuid',
        'e6fdcbd7-255a-46c2-8395-c8094fd37cd2',
      );
      expect(result).toHaveProperty('total', 2);
      expect(companiesService.getCompanies).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if getCompanies fails', async () => {
      const errorMessage = 'File read error';
      mockCompaniesService.getCompanies.mockImplementationOnce(() => {
        throw new Error(errorMessage);
      });

      try {
        await controller.getAllCompanies();
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(error.getResponse()).toEqual({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to find companies',
          stacktrace: 'File read error',
        });
      }
    });
  });
});
