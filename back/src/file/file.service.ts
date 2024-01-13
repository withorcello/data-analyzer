import { BadRequestException, Injectable } from '@nestjs/common';
import { RecordsFileDto } from './dto/records-file.dto';
import { parse } from 'csv/sync';
import * as Excel from 'exceljs';
import * as dayjs from 'dayjs';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async create(file: Express.Multer.File) {
    try {
      const fileExt = path.extname(file.originalname);

      if (!['.xlsx', '.csv'].includes(fileExt)) {
        throw new BadRequestException({
          message: 'Este tipo de arquivo não é aceito',
          detail: 'Por favor selecione um arquivo com extenção xlsx ou csv',
        });
      }

      const fileDir = `${__dirname}/../../files/${file.originalname}`;
      fs.writeFile(fileDir, file.buffer, (err) => {
        if (err) {
          return {
            message: 'Erro ao analizar arquivo',
            detail: err.message,
          };
        }
      });
    } catch (error) {
      return error;
    }
  }
  async analyzeFile(fileName: string) {
    const fileDir = `${__dirname}/../../files/${fileName}`;
    if (!fs.existsSync(fileDir)) {
      throw new BadRequestException({
        message: 'Erro ao analizar arquivo',
        detail: 'Arquivo não encontrado tente fazer o upload novamente',
      });
    }
    const file = fs.readFileSync(fileDir);
    const fileExt = path.extname(fileName);

    let records = [];
    if (fileExt === '.xlsx') {
      records = await this.getDataOfXslx(file);
    } else if (fileExt === '.csv') {
      records = this.getDataOfCsv(file);
    }

    return this.getMonthlyRecurringRevenue(records);
  }
  async getDataOfXslx(file: Buffer): Promise<Array<RecordsFileDto>> {
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.load(file);

    const worksheet = content.worksheets[0];
    const rows = worksheet.getRows(2, worksheet.rowCount) ?? [];
    return rows.map((row) => ({
      periodicidade: row.getCell(1).toString(),
      dataInicio: row.getCell(4).toString(),
      status: row.getCell(5).toString(),
      dataStatus: row.getCell(6).toString(),
      dataCancelamento: row.getCell(7).toString(),
      valor: +row.getCell(8).toString(),
      dataFim: row.getCell(9).toString(),
    }));
  }
  getDataOfCsv(file: Buffer): Array<RecordsFileDto> {
    const rows = parse(file, {
      columns: true,
      delimiter: ',',
    });

    return rows.map((row) => ({
      periodicidade: row['periodicidade'],
      dataInicio: row['data início'],
      status: row['status'],
      dataStatus: row['data status'],
      dataCancelamento: row['data cancelamento'],
      valor: +row['valor'].replace(',', '.'),
      dataFim: row['próximo ciclo'],
    }));
  }
  getMonthlyRecurringRevenue(records: Array<RecordsFileDto>) {
    const monthlyRecords = records.filter((record) => {
      const mensal = record.periodicidade === 'Mensal';
      return mensal && record.status !== 'Trial cancelado';
    });

    let startDate: dayjs.Dayjs, endDate: dayjs.Dayjs;
    for (const record of monthlyRecords) {
      if (!startDate || dayjs(record.dataInicio).isBefore(startDate, 'D')) {
        startDate = dayjs(record.dataInicio);
      }
      const atrasada = record.status === 'Atrasada';
      const dataFim = atrasada ? record.dataStatus : record.dataFim;
      if (!endDate || dayjs(dataFim).isAfter(endDate, 'D')) {
        endDate = dayjs(dataFim);
      }
    }

    const monthlyRecurringRevenue = [];
    while (startDate.isSame(endDate, 'M') || startDate.isBefore(endDate, 'M')) {
      const totalValue = monthlyRecords.reduce((total, record) => {
        const isSame = startDate.isSame(record.dataInicio, 'M');
        const isAfter = startDate.isAfter(record.dataInicio, 'M');
        const canceled = record.status === 'Cancelada';
        const isAfterCancel = startDate.isAfter(record.dataCancelamento, 'M');

        if ((isSame || isAfter) && (!canceled || !isAfterCancel)) {
          total += record.valor;
        }
        return total;
      }, 0);

      monthlyRecurringRevenue.push({
        month: startDate.format('MM/YYYY'),
        value: +totalValue.toFixed(2),
      });

      startDate = startDate.add(1, 'M');
    }

    return monthlyRecurringRevenue;
  }
}
