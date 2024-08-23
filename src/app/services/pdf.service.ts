// pdf.service.ts
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;
  }

  generatePdf(users: any[]) {
    const documentDefinition = {
      content: [
        { text: 'User List Report', style: 'header' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
            body: [
              ['ID', 'First Name', 'Last Name', 'Email'],
              ...users.map(user => [
                user.id,
                user.firstNameUser,
                user.lastNameUser,
                user.mailUser
              ])
            ]
          },
          layout: 'lightHorizontalLines'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('user-list.pdf');
  }
}
