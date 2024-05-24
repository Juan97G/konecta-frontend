import React, {useState, useContext, useEffect} from 'react';
import "./styles.css";
import Loading from "../../components/Loading";
import {Button, Icon, Input, Pagination, Table, TableHeaderCell} from "semantic-ui-react";
import AuthContext from "../../context/auth/authContext";
import SolicitudContext from "../../context/solicitud/solicitudContext";
import ModalSolicitud from "./ModalSolicitud";
import {toast} from "react-toastify";

const Solicitud = () => {

  /* STATES */
  const [querySearch, setQuerySearch] = useState("");

  /* CONTEXT */
  const { user } = useContext(AuthContext);
  const { solicitudes, isLoading, currentPage, totalPages, getSolicitudes, openModalCrearSolicitud, deleteSolicitud } = useContext(SolicitudContext);

  useEffect(() => {
    (async () => {
      await getSolicitudes(1, "");
    })();
  }, []);

  /* FUNCTIONS */
  const removeSolicitud = async (idSolicitud) => {
    const response = await deleteSolicitud(idSolicitud);

    toast.success(response.data.message);
  }

  return (
    <div className="solicitudes-container">
      {isLoading && <Loading/>}
      <div className="title-and-button-add">
        <h1>Solicitudes</h1>

        <div>
          <Input
            icon={<Icon name='search' inverted circular link onClick={async () => await getSolicitudes(1, querySearch)}/>}
            placeholder='Filtrar por nombre o email...'
            className="input-search-table"
            size="small"
            onChange={(ev) => setQuerySearch(ev.target.value)}
          />
          {user.rol === "admin" && (
            <Button basic onClick={() => openModalCrearSolicitud()}>
              Crear solicitud
            </Button>
          )}
        </div>
      </div>

      <div className="table-contain">
        <Table striped unstackable>
          <Table.Header>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Código</TableHeaderCell>
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Resumen</TableHeaderCell>
            <TableHeaderCell>Nombre Empleado</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </Table.Header>
          <Table.Body>
            {solicitudes.length > 0
              ? (
                solicitudes.map((solicitud) => (
                  <Table.Row key={solicitud.id}>
                    <Table.Cell>{solicitud.id}</Table.Cell>
                    <Table.Cell>{solicitud.codigo}</Table.Cell>
                    <Table.Cell>{solicitud.descripcion}</Table.Cell>
                    <Table.Cell>{solicitud.resumen}</Table.Cell>
                    <Table.Cell>{solicitud.empleado.nombre}</Table.Cell>
                    <Table.Cell>
                      <Button
                        circular
                        color='google plus'
                        icon='trash alternate'
                        size="small"
                        disabled={user.rol === "employee"}
                        onClick={() => removeSolicitud(solicitud.id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={7}>
                    <p className="text-not-records-products">No se han encontrado registros de solicitudes</p>
                  </Table.Cell>
                </Table.Row>
              )
            }

          </Table.Body>
        </Table>
      </div>

      {solicitudes.length > 0 && (
        <div className="pagination">
          <Pagination
            boundaryRange={1}
            defaultActivePage={currentPage}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={async (_, data) => await getSolicitudes(data.activePage, querySearch)}
          />
        </div>
      )}

      <ModalSolicitud />
    </div>
  );
};

export default Solicitud;
