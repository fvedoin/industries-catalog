import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CompaniesService {
  private readonly dataFilePath = path.join(
    process.cwd(),
    'src',
    'data',
    'data.json',
  );

  getCompanies() {
    const rawData = fs.readFileSync(this.dataFilePath, 'utf8');
    return JSON.parse(rawData);
  }
}
