import React, {useContext, useEffect, useState} from 'react';
import "./styles.css";
import {Button, Icon, Input, Pagination, Table, TableHeaderCell} from "semantic-ui-react";
import AuthContext from "../../context/auth/authContext";
import EmpleadoContext from "../../context/empleado/empleadoContext";
import Loading from "../../components/Loading";

const Empleado = () => {

  /* STATES */
  const [querySearch, setQuerySearch] = useState("");

  /* CONTEXT */
  const { user, openModalSignup } = useContext(AuthContext);
  const { empleados, isLoading, currentPage, totalPages, getEmpleados } = useContext(EmpleadoContext);

  useEffect(() => {
    (async () => {
      await getEmpleados(1, "");
    })();
  }, []);

  return (
    <div className="empleados-container">
      { isLoading && <Loading /> }
      <div className="title-and-button-add">
        <h1>Empleados</h1>

        <div>
          <Input
            icon={<Icon name='search' inverted circular link onClick={async () => await getEmpleados(1, querySearch)}/>}
            placeholder='Filtrar por nombre o email...'
            className="input-search-table"
            size="small"
            onChange={(ev) => setQuerySearch(ev.target.value)}
          />
          {user.rol === "admin" && (
            <Button basic onClick={() => openModalSignup('Crear Empleado', 'CREAR')}>
              Crear empleado
            </Button>
          )}
        </div>
      </div>

      <div className="table-contain">
        <Table striped unstackable>
          <Table.Header>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Fecha Ingreso</TableHeaderCell>
            <TableHeaderCell>Salario</TableHeaderCell>
            <TableHeaderCell>Rol</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
          </Table.Header>
          <Table.Body>
            { empleados.length > 0
              ? (
                empleados.map((emp) => (
                  <Table.Row key={emp.id}>
                    <Table.Cell>{emp.id}</Table.Cell>
                    <Table.Cell>{emp.nombre}</Table.Cell>
                    <Table.Cell>{emp.fechaIngreso}</Table.Cell>
                    <Table.Cell>{new Intl.NumberFormat('es-CO', {
                      style: 'currency',
                      currency: 'COP'
                    }).format(emp.salario)}</Table.Cell>
                    <Table.Cell>{emp.rol}</Table.Cell>
                    <Table.Cell>{emp.email}</Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7}>
                    <p className="text-not-records-products">No se han encontrado registros de empleados</p>
                  </Table.Cell>
                </Table.Row>
              )
            }

          </Table.Body>
        </Table>
      </div>

      { empleados.length > 0 && (
        <div className="pagination">
          <Pagination
            boundaryRange={1}
            defaultActivePage={currentPage}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={async (_, data) => await getEmpleados(data.activePage, querySearch)}
          />
        </div>
      )}
    </div>
  );
};

export default Empleado;
