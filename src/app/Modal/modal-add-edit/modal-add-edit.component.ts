import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clientes } from '../../../../src/app/Interface/clientes';
import { ClientesService } from '../../../../src/app/Services/clientes.service';
import { Direccion } from '../../../../src/app/Interface/direccion';
import { DireccionesService } from '../../../../src/app/Services/direcciones.service';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css'],
})
export class ModalAddEditComponent implements OnInit {
  formCliente: FormGroup;
  tituloAccion: string = 'Nuevo';
  botonAccion: string = 'Guardar';

  constructor(
    private dialogoReferencia: MatDialogRef<ModalAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private clienteServices: ClientesService,
    private direccionServices: DireccionesService,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Clientes
  ) {
    this.formCliente = this.fb.group({
      Nombre: ['', Validators.required],
      Edad: ['', Validators.required],
    });
  }

  MostrarAlerta(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  addEditCliente() {
    const modelo: Clientes = {
      id: this.dataCliente.id,
      nombre: this.formCliente.value.Nombre,
      edad: this.formCliente.value.Edad,
    };

    console.log('Modelo De datos', this.formCliente);

    if (this.dataCliente == null) {
      this.clienteServices.add(modelo).subscribe({
        next: (data) => {
          this.MostrarAlerta('El Cliente Fue Agregado', 'Listo');
          this.dialogoReferencia.close('creado');
        },
        error: (e) => {
          this.MostrarAlerta('El Cliente No fue Agregado', 'Error');
        },
      });
    } else {
      this.clienteServices.update(this.dataCliente.id, modelo).subscribe({
        next: (data) => {
          this.MostrarAlerta('No Se Puede Editar', 'Error');
        },
        error: (e) => {
          this.MostrarAlerta('No Se Puede Editar', 'Error');

          this.MostrarAlerta('El Cliente Fue Editado', 'Listo');
          this.dialogoReferencia.close('editado');
        },
      });
    }
  }

  ngOnInit(): void {
    if (this.dataCliente) {
      this.formCliente.patchValue({
        Nombre: this.dataCliente.nombre,
        Edad: this.dataCliente.edad,
      });

      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
    }
  }
}
