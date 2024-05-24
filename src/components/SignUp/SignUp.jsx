import React, {useContext, useState} from 'react';
import "./styles.css";
import * as Yup from 'yup';
import {useFormik} from "formik";
import CustomModal from "../CustomModal";
import {Button, Form, Modal} from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import AuthContext from "../../context/auth/authContext";
import {toast} from "react-toastify";

const SignUp = () => {

  /* STATES */
  const [error, setError] = useState(null);

  /* CONTEXT */
  const { loading, titleModal, textButton, sizeModal, openSignup, closeModal, signup } = useContext(AuthContext);

  /* FORMIK */
  const formik = useFormik({
    initialValues: {
      name: "",
      dateEntry: "",
      salary: "",
      role: "employee",
      email: "",
      password: "",
      repeatPassword: ""
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().matches(/^[a-z A-Z]*$/, "El nombre solo debe contener letras").required("El nombre es" +
        " obligatorio"),
      dateEntry: Yup.date().required("La fecha de ingreso es obligatoria"),
      salary: Yup.string().matches(/^[0-9]*$/, "El salario solo debe llevar valores númericos. Ni puntos ni comas.").required("El salario es obligatorio"),
      role: Yup.string().required("El rol es obligatorio"),
      email: Yup.string().email("El email no tiene un formato válido").required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
      repeatPassword: Yup.string().required("Repetición de la contraseña es obligatoria").oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    }),

    onSubmit: async (formData) => {
      setError(null);

      const data = {
        fechaIngreso: formData.dateEntry,
        nombre: formData.name,
        salario: formData.salary,
        rol: formData.role,
        email: formData.email,
        password: formData.password
      }

      const response = await signup(data);

      if (!response && titleModal === 'Registrarme') {
        toast.success("¡Registro correcto! Ya puedes iniciar sesión en el sitio");
        formik.resetForm();
      }

      if (!response && titleModal === 'Crear Empleado') {
        toast.success("Empleado creado correctamente");
        formik.resetForm();
      }

      if (response.error) {
        setError(response.error);
      }
    }
  })

  return (
    <div>
      <CustomModal
        size={sizeModal}
        open={openSignup}
        onClose={() => {formik.resetForm(); closeModal();}}
      >
        <Modal.Header className="title-modal">{titleModal}</Modal.Header>
        <Modal.Content>
          {error && <span className="error-login">{error}</span>}

          <Form className="form-signup">
            <Form.Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && formik.touched.name
                ? (<span className="field-error">{formik.errors.name}</span>)
                : null
              }
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="name">Fecha Ingreso</label>
                <SemanticDatepicker
                  onChange={(_, data) => formik.setFieldValue("dateEntry", data.value)}
                />
                {formik.errors.dateEntry && formik.touched.dateEntry
                  ? (<span className="field-error">{formik.errors.dateEntry}</span>)
                  : null
                }
              </Form.Field>
              <Form.Field>
                <label htmlFor="salary">Salario</label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                />
                {formik.errors.salary && formik.touched.salary
                  ? (<span className="field-error">{formik.errors.salary}</span>)
                  : null
                }
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="role">Rol</label>
                <select name="role" id="role" onChange={formik.handleChange}>
                  <option value="employee">Empleado</option>
                  <option value="admin">Administrador</option>
                </select>
                {formik.errors.role && formik.touched.role
                  ? (<span className="field-error">{formik.errors.role}</span>)
                  : null
                }
              </Form.Field>
              <Form.Field>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email
                  ? (<span className="field-error">{formik.errors.email}</span>)
                  : null
                }
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password
                  ? (<span className="field-error">{formik.errors.password}</span>)
                  : null
                }
              </Form.Field>
              <Form.Field>
                <label htmlFor="repeatPassword">Repetir contraseña</label>
                <input
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
                  value={formik.values.repeatPassword}
                  onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword
                  ? (<span className="field-error">{formik.errors.repeatPassword}</span>)
                  : null
                }
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions className="actions-modal-signup">
          <Button type="submit" loading={loading} onClick={() => formik.handleSubmit()}>
            { textButton }
          </Button>
        </Modal.Actions>
      </CustomModal>
    </div>
  );
};

export default SignUp;
