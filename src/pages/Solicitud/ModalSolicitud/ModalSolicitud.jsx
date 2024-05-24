import React, {useContext, useState} from 'react';
import CustomModal from "../../../components/CustomModal";
import {Button, Form, Modal} from "semantic-ui-react";
import {useFormik} from "formik";
import * as Yup from "yup";
import SolicitudContext from "../../../context/solicitud/solicitudContext";
import {toast} from "react-toastify";
import AuthContext from "../../../context/auth/authContext";

const ModalSolicitud = () => {

  /* STATES */
  const [error, setError] = useState(null);

  /* CONTEXT */
  const { titleModal, openModal, isLoadingModal, createSolicitud } = useContext(SolicitudContext);
  const { user } = useContext(AuthContext);

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      codigo: "",
      descripcion: "",
      resumen: "",
    },

    validationSchema: Yup.object().shape({
      codigo: Yup.string().required("El código es obligatorio"),
      descripcion: Yup.string().required("La descripción es obligatoria"),
      resumen: Yup.string().required("El resumen es obligatorio"),
    }),

    onSubmit: async (formData) => {
      setError(null);

      const data = {
        ...formData,
        idEmpleado: user.id
      }

      const response = await createSolicitud(data);

      if (!response) {
        toast.success("Solicitud creada correctamente");
        formik.resetForm();
      }

      if (response.error) {
        setError(response.error);
      }
    }
  })
  return (
    <CustomModal
      size={"tiny"}
      open={openModal}
      onClose={() => {}}
    >
      <Modal.Header className="title-modal">{titleModal}</Modal.Header>
      <Modal.Content>
        {error && <span className="error-login">{error}</span>}

        <Form className="form-solicitud">
          <Form.Field>
            <label htmlFor="codigo">Código</label>
            <input
              type="text"
              name="codigo"
              id="codigo"
              value={formik.values.codigo}
              onChange={formik.handleChange}
            />
            {formik.errors.codigo && formik.touched.codigo
              ? (<span className="field-error">{formik.errors.codigo}</span>)
              : null
            }
          </Form.Field>
          <Form.Field>
            <label htmlFor="descripcion">Descripción</label>
            <input
              type="text"
              name="descripcion"
              id="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
            />
            {formik.errors.descripcion && formik.touched.descripcion
              ? (<span className="field-error">{formik.errors.descripcion}</span>)
              : null
            }
          </Form.Field>
          <Form.Field>
            <label htmlFor="resumen">Resumen</label>
            <input
              type="text"
              name="resumen"
              id="resumen"
              value={formik.values.resumen}
              onChange={formik.handleChange}
            />
            {formik.errors.resumen && formik.touched.resumen
              ? (<span className="field-error">{formik.errors.resumen}</span>)
              : null
            }
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions className="actions-modal-signup">
        <Button type="submit" loading={isLoadingModal} onClick={() => formik.handleSubmit()}>
          CREAR SOLICITUD
        </Button>
      </Modal.Actions>
    </CustomModal>
  );
};

export default ModalSolicitud;
