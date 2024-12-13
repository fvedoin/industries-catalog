import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import * as fs from 'fs';

// Mock fs module as a jest mock function
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('CompaniesService', () => {
  let service: CompaniesService;

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
        tagline: 'Digital healthcare solution for digestive health and disease',
        total_jobs_available: 0,
      },
    ],
    total: 2,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCompanies', () => {
    // Mock file content
    beforeAll(() => {
      (fs.readFileSync as jest.Mock).mockReturnValue(
        JSON.stringify(mockCompaniesData),
      );
    });

    it('should return an array of companies', () => {
      const response = service.getCompanies();

      expect(response.items).toHaveLength(2);
      expect(response.items[0]).toHaveProperty(
        'uuid',
        'e6fdcbd7-255a-46c2-8395-c8094fd37cd2',
      );
    });

    it('should return the right total number', () => {
      const response = service.getCompanies();

      expect(response.items).toHaveLength(response.total);
    });

    it('should throw an error if there is a problem reading the file', () => {
      jest.clearAllMocks();
      (fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
        throw new Error('File read error');
      });

      expect(() => service.getCompanies()).toThrowErrorMatchingSnapshot(
        'File read error',
      );
    });
  });
});
