import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Clientes } from '../../../../src/app/Interface/clientes';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  constructor(
    private dialogoReferencia: MatDialogRef<ModalDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCliente: Clientes
  ) {}

  ngOnInit(): void {}

  confirmarEliminar() {
    if (this.dataCliente) {
      this.dialogoReferencia.close('eliminar');
    }
  }
}
