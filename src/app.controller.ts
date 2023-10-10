import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('report/income')
export class AppController {
  @Get()
  getAllIncomeReports() {
    return [];
  }
  @Get(':hi')
  getIncomeReportById() {
    return ['hello'];
  }
  @Post()
  createReport() {
    return 'Created';
  }
  @Put()
  updateReport() {
    return 'Updated';
  }
  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
