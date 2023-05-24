import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Clientes } from './Interface/clientes';
import { ClientesService } from './Services/clientes.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalAddEditComponent } from './Modal/modal-add-edit/modal-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDeleteComponent } from './Modal/modal-delete/modal-delete.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'edad', 'Direcciones', 'Acciones'];
  dataSource = new MatTableDataSource<Clientes>();

  constructor(
    private clienteService: ClientesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mostrarCliente();
  }

  title = 'CrudClinte';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  MostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  mostrarCliente() {
    this.clienteService.getList().subscribe({
      next: (dataResponse) => {
        console.log(dataResponse);
        this.dataSource.data = dataResponse;
      },
      error: (e) => {},
    });
  }

  ModalNuevoCliente() {
    this.dialog
      .open(ModalAddEditComponent, {
        disableClose: true,
        width: '350px',
        height: '350px',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarCliente();
        }
      });
  }

  ModalEditarCliente(dataCliente: Clientes) {
    this.dialog
      .open(ModalAddEditComponent, {
        disableClose: true,
        width: '350px',
        height: '350px',
        data: dataCliente,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'editado') {
          this.mostrarCliente();
        }
      });
  }

  ModalEliminarCliente(dataCliente: Clientes) {
    this.dialog
      .open(ModalDeleteComponent, {
        disableClose: true,
        data: dataCliente,
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'eliminar') {
          this.clienteService.delete(dataCliente.id).subscribe({
            next: (data) => {
              this.MostrarAlerta('Empleado Fue Eliminado', 'Listo');
              this.mostrarCliente();
            },
            error: (e) => {},
          });
        }
      });
  }
}
