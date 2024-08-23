import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { PdfService } from 'src/app/services/pdf.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  formVisible = false;
  loadingOperation = false;
  loading = false;
  filter = "";
  mode = 1; 
  listUsers: any[] = [];
  filteredUsers: any[] = []; // Propiedad para los datos filtrados
  formUser!: UntypedFormGroup;

  constructor(
    private _userService: UserService, 
    private _ntService: NzNotificationService,
    private _fb: UntypedFormBuilder, 
    private modalService: NzModalService, 
    private _pdfService: PdfService
  ) {}

  ngOnInit() {
    this.getAllUsers();
    this.generateForm();
  }

  getAllUsers() {
    this.loading = true;
    this._userService.getAllUsers().subscribe(value => {
      this.loading = false;
      this.listUsers = value;
      this.applyFilter(); // Aplica el filtro inicial
    }, (e: Error) => {
      this.loading = false;
      this._ntService.error('ERROR LISTADO DE USUARIOS', 'error=>' + e.message);
    })
  }

  generatePdf() {
    // Llama al método del servicio para generar el PDF
    this._pdfService.generatePdf(this.filteredUsers); // Usa los datos filtrados para el PDF
  }

  applyFilter() {
    if (this.filter) {
      this.filteredUsers = this.listUsers.filter(user => 
        user.firstNameUser.toLowerCase().includes(this.filter.toLowerCase()) ||
        user.lastNameUser.toLowerCase().includes(this.filter.toLowerCase()) ||
        user.mailUser.toLowerCase().includes(this.filter.toLowerCase()) ||
        user.identifierUser.toLowerCase().includes(this.filter.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.listUsers]; // Muestra todos los usuarios si no hay filtro
    }
  }

  onFilterChange(value: string) {
    this.filter = value;
    this.applyFilter();
  }

  generateForm() {
    this.formUser = this._fb.group({
      id: [0],
      firstNameUser: [null, [Validators.required]],
      lastNameUser: [null, [Validators.required]],
      mailUser: [null, [Validators.required]],
      passwordUser: [null, [Validators.required]],
      identifierUser: [null, [Validators.required]],
    });
    this.formUser.reset();
  }

  handleCancel() {
    this.formUser.reset();
    this.formVisible = false;
  }

  handleOk() {
    this.loadingOperation = true;
    if (this.formUser.invalid) {
      this._ntService.error('FORMULARIO CON CAMPOS VACIOS', '');
      this.loadingOperation = false;
      return;
    }
    let data = this.formUser.value;
    this._userService.saveUser(data).subscribe(value => {
      this.loadingOperation = false;
      this.generateForm();
      this.handleCancel();
      this.getAllUsers(); // Recarga los usuarios para aplicar el filtro
    }, (e: Error) => {
      this.loadingOperation = false;
      this._ntService.error('ERROR GUARDANDO REGISTRO', 'error=>' + e.message);
    });
  }

  editItem(item: any) {
    this.generateForm();
    this.formVisible = true;
    this.formUser.patchValue(item);
  }

  deleteItem(item: any) {
    this.modalService.confirm({
      nzTitle: '<i>¿Está seguro de eliminar este puerto?</i>',
      nzContent: '<b>El puerto se eliminará permanentemente</b>',
      nzOnOk: () => {
        this._userService.deleteUser(item.id).subscribe(value => {
          this._ntService.success("Usuario eliminado exitosamente", '');
          this.getAllUsers(); // Recarga los usuarios para aplicar el filtro
        }, (e: Error) => {
          this._ntService.error("ERROR", "error: " + e.message);
        });
      }
    });
  }
}
